(function () {
  var createDB = function() {
    var projects = {};
    var employees = {};
    var projectCounter = 1;
    var employeeCounter = 1;
    var taskCounter = [];

    // var clearEverything = function () {
      
    // };

    // Project Functions
    var createProject = function(projectName) {
      taskCounter.push({pid: projectCounter, taskCount: 0});
      // projects[projectCounter] = {id: projectCounter, name: projectName, tasks: []}
      var project = buildProject({id: projectCounter, name: projectName});
      localStorage.setItem("project_" + project.id, JSON.stringify(project));
      projectCounter++;
      return project;
    };

    var getIndividualProject = function(id) {
      var project = projects[id];
      return project;
    };

    var getAllProjects = function() {
      return projects;
    };

    var buildProject = function(data) {
      var p = new TM.Project(data);
      return p;
    };

    var updateProject = function(id, info) {
      var project = projects[id];
      project.name = info;
      return project;
    };

    var destroyProject = function(projectId) {
      delete projects[projectId];
    };

    // Task Functions
    var createTask = function(data) {
      var taskNum;
      var project = projects[data.projectId];
      
      for (var i = 0; i < taskCounter.length; i++) {
        if (taskCounter[i].pid === project.id) {
          taskCounter[i].taskCount++;
          taskNum = taskCounter[i].taskCount;
        }
      }
      
      project.tasks.push({taskId: taskNum, description: data.description, employees: [], completed: false}); 
      var task = buildTask({projectId: project.id, id: taskNum, description: data.description});
      return task;
    };

    var getIndividualTask = function(projectId, taskId) {
      var project = projects[projectId];
      for (var i = 0; i < project.tasks.length; i++) {
        if (project.tasks[i].taskId === taskId) {
          return task = project.tasks[i];
        } else {
          task = "No such task!";
        }
      }
    };

    var getAllTasks = function(projectId) {
      var project = projects[projectId];
      return project.tasks;
    };

    var buildTask = function(obj) {
      var task = new TM.Task(obj);
      return task;
    };

    var updateTask = function(projectId, tid, data) {
      var project = projects[projectId];
      for (var i = 0; i < project.tasks.length; i++) {
        if (project.tasks[i].taskId === tid) {
          var task = project.tasks[i]
          task.description = data;
        }
      }
    };

    var destroyTask = function(projectId, tid) {
      var project = projects[projectId];
      for (var i = 0; i < project.tasks.length; i++) {
        if (project.tasks[i].taskId === tid) {
          project.tasks.splice(i, 1);
        }
      }
      return project;
    };

    var completedTask = function(projectId, tid) {
      var project = projects[projectId];
      for (var i = 0; i < project.tasks.length; i++) {
        if (project.tasks[i].taskId === tid) {
          project.tasks[i].completed = true;
        }
      }
    };

    // Employee Functions
    var createEmployee = function(name){
      employees[employeeCounter] = {id: employeeCounter, name: name, projects: [], tasks: []};
      var employee = buildEmployee({id: employeeCounter, name: name});
      employeeCounter++;
      return employee;
    };

    var getIndividualEmployee = function(eid){
      var employee = employees[eid];
      return employee;
    };

    var buildEmployee = function(data){
      var employee = new TM.Employee(data);
      return employee;
    };
    
    var giveEmployeeAccess = function(eid, pid) {
      var employee = employees[eid];
      var project = projects[pid];
      employee.projects.push(project);
      return employee;
    };
    
    var assignEmployeeToTask = function(eid, pid, tid) {
      var employee = employees[eid];
      var tasks = employee.tasks;
      var project = projects[pid];
      var task;
      
      for (var i = 0; i < 2; i++) {
        if (project.tasks[i].taskId === tid) {
          task = project.tasks[i];
          tasks.push(task);
          task.employees.push(employee);
        }
      }
      return task.employees;
    };

    // Query Functions
    var getEmployeeTasks = function(eid) {
      var employee = employees[eid];
      return employee.tasks;
    }

    return {
      createProject: createProject,
      getIndividualProject: getIndividualProject,
      getAllProjects: getAllProjects,
      buildProject: buildProject,
      updateProject: updateProject,
      destroyProject: destroyProject,
      createTask: createTask,
      buildTask: buildTask,
      getIndividualTask: getIndividualTask,
      completedTask: completedTask,
      updateTask: updateTask,
      destroyTask: destroyTask,
      getAllTasks: getAllTasks,
      createEmployee: createEmployee,
      buildEmployee: buildEmployee,
      getIndividualEmployee: getIndividualEmployee,
      giveEmployeeAccess: giveEmployeeAccess,
      assignEmployeeToTask: assignEmployeeToTask, 
      getEmployeeTasks: getEmployeeTasks,
    }
  };


  var dbInstance = null;

  TM.getDB = function() {
    if (!dbInstance) {
      dbInstance = createDB();
    }
    return dbInstance;
  };

  TM.clearDBInstance = function () {
    dbInstance = null;
  };
})();
