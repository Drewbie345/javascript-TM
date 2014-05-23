(function() {
  var createDB = function() {
    var projectCounter = 1;
    var taskCounter = 1;

    // Project Functions
    var createProject = function(name) {
      var project = { 
        id: projectCounter,
        name: name,
        taskIDs: []
      }

      localStorage.setItem("project" + projectCounter, JSON.stringify(project));
      var actualProject = buildProject(project);
      projectCounter++;
      return actualProject;
    };

    var buildProject = function(data) {
      var project = new TM.Project(data);
      return project;
    };

    var getIndividualProject = function(id) {
      var projectData = localStorage.getItem("project" + id);
      var project = JSON.parse(projectData);
      
      if (project === null) {
        return undefined;
      }

      var buildPro = buildProject(project);
      return project;
    };

    var getAllProjects = function() {
      var allData = localStorage;
      var allProjects = [];
      for (var projectData in allData) {
        if (projectData.indexOf("project") != -1) {
          var project = JSON.parse(allData[projectData])
          allProjects.push(project);
        }
      }
      return allProjects;
    };

    var updateProject = function(id, data) {
      var projectData = localStorage.getItem("project" + id);
      var project = JSON.parse(projectData);
      project.name = data.name;
      localStorage.setItem("project" + id, JSON.stringify(project));
      return project;
    };

    var destroyProject = function(id) {
      localStorage.removeItem("project" + id);
    };

    // Task Functions
    var createTask = function(pid, data) {
      var projectData = localStorage.getItem("project" + pid);
      var project = JSON.parse(projectData);
      project.taskIDs.push(taskCounter);

      localStorage.setItem("project" + pid, JSON.stringify(project));

      var task = {
        id: taskCounter,
        projectId: pid,
        description: data.description,
        completed: false
      }

      localStorage.setItem("task" + taskCounter, JSON.stringify(task));
      var actualTask = buildTask(task);
      taskCounter++;
      return actualTask;
    };

    var buildTask = function(data) {
      var task = new TM.Task(data);
      return task;
    };

    var getIndividualTask = function(id) {
      var taskData = localStorage.getItem("task" + id);
      var task = JSON.parse(taskData);

      if (task === null) {
        return undefined;
      }
      var buildT = buildTask(task);
      return task;
    }

    var getTasksByProject = function(pid) {
      var projectData = localStorage.getItem("project" + pid);
      var project = JSON.parse(projectData);
      var tasks = [];
      for (var i = 0; i < project.taskIDs.length; i++) {
        var task = getIndividualProject(project.taskIDs[i]);
        tasks.push(task);
      }
      return tasks;
    }

    var getAllTasks = function() {
      var allData = localStorage;
      var allTasks = [];
      for (var taskData in allData) {
        if (taskData.indexOf("task") != -1) {
          var task = JSON.parse(allData[taskData])
          if (typeof task !== "undefined") {
            allTasks.push(task);
          }
        }
      }
      return allTasks;
    }

    var updateTask = function(id, data) {
      var taskData = localStorage.getItem("task" + id);
      var task = JSON.parse(taskData);
      task.description = data.description;

      localStorage.setItem("task" + id, JSON.stringify(task));
      return task;
    }

    var destroyTask = function(id) {
      localStorage.removeItem("task" + id);
    }

    // Need to fix error where getAllTasks includes undefined, deleted tasks
    // Need to remove task from project.taskIDs array when destroyTask is called
    

    var completeTask = function() {}

    return {
      createProject: createProject,
      buildProject: buildProject,
      getIndividualProject: getIndividualProject,
      updateProject: updateProject,
      getAllProjects: getAllProjects,
      destroyProject: destroyProject,
      createTask: createTask,
      buildTask: buildTask,
      getIndividualTask: getIndividualTask,
      getTasksByProject: getTasksByProject,
      getAllTasks: getAllTasks,
      updateTask: updateTask,
      destroyTask: destroyTask
    }
  };
  
  var dbInstance = null;

  TM.getDB = function() {
    if (!dbInstance) {
      dbInstance = createDB();
    }
    return dbInstance;
  };

})();