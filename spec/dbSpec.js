describe( "DB library", function() {
  var myDB;

  var myFirstProject;
  var mySecondProject;
  var myThirdProject;
  
  var myFirstTask;
  var mySecondTask;
  var myThirdTask;
  var myFourthTask;

  var projects;
  var tasks;

  var jane;
  var john;

  myDB = DB.getDB();
  
  myDB.createProject("My Project");
  myDB.createProject("My Second Project");
  myDB.createProject("What what!");

  myFirstProject = myDB.getIndividualProject(1);
  mySecondProject = myDB.getIndividualProject(2);
  myThirdProject = myDB.getIndividualProject(3);

  myDB.createTask({projectId: myFirstProject.id, description: "mow grass"});
  myDB.createTask({projectId: myFirstProject.id, description: "bake cookies"});
  myDB.createTask({projectId: mySecondProject.id, description: "grocery shopping"});
  myDB.createTask({projectId: mySecondProject.id, description: "dog food"});
  myDB.createTask({projectId: myThirdProject.id, description: "mop floors"});
  myDB.createTask({projectId: myThirdProject.id, description: "dust shelves"});

  myFirstTask = myDB.getIndividualTask(myFirstProject.id, 1);
  mySecondTask = myDB.getIndividualTask(myFirstProject.id, 2);
  myThirdTask = myDB.getIndividualTask(mySecondProject.id, 1);
  myFourthTask = myDB.getIndividualTask(mySecondProject.id, 2);
  myFifthTask = myDB.getIndividualTask(myThirdProject.id, 1);
  mySixthTask = myDB.getIndividualTask(myThirdProject.id, 2);

  myDB.createEmployee("Jane Doe");
  myDB.createEmployee("John Doe");

  jane = myDB.getIndividualEmployee(1);
  john = myDB.getIndividualEmployee(2);

  projects = myDB.getAllProjects();
  tasks1 = myDB.getAllTasks(myFirstProject.id);
  tasks2 = myDB.getAllTasks(mySecondProject.id);

  describe( "create a singleton", function() {
    it("creates only one instance of a DB, even when called twice", function() {
      var myDB1 = DB.getDB();
      var myDB2 = DB.getDB();

      expect(myDB1 === myDB2).toEqual(true);
    })
  });

  // Project Tests
  describe( "create project", function() {
    it("creates projects with names and unique ids", function() {
      expect(myFirstProject.name).toEqual("My Project");
      expect(myFirstProject.id).toEqual(1);

      expect(mySecondProject.name).toEqual("My Second Project");
      expect(mySecondProject.id).toEqual(2);
      
      expect(projects[1].name).toEqual("My Project");
      expect(projects[2].name).toEqual("My Second Project");
    })
  });

  describe( "update project", function() {
    it("updates project attributes", function() {
      expect(myThirdProject.name).toEqual("What what!");

      myDB.updateProject(3, "Hey Hey!");

      var checkingProject = myDB.getIndividualProject(3);
      expect(checkingProject.name).toEqual("Hey Hey!");
    })
  });

  describe( "remove project", function() { 
    it("removes a project from the database", function() {
      expect(mySecondProject.name).toEqual("My Second Project");

      myDB.destroyProject(2);

      secondProject = myDB.getIndividualProject(2);
      expect(secondProject).toBeUndefined();
    })
  });

  describe( "retrieve project", function() {
    it("retrieves project by id", function() {
      expect(myThirdProject.name).toEqual("Hey Hey!");
    })
  });

  // Task Tests
  describe( "create task", function() {
    it("creates a task with a project id, a unique id and a description", function() {
      expect(myFirstTask.taskId).toEqual(1);
      expect(myFirstTask.description).toEqual("mow grass");
    })
  });

  describe( "retrieve individual task", function() {
    it("retrieve task by project id", function() {   
      expect(myFirstTask.taskId).toEqual(1);
      expect(myFirstTask.description).toEqual("mow grass");

      expect(mySecondTask.taskId).toEqual(2);
      expect(mySecondTask.description).toEqual("bake cookies");
    })
  });

  describe( "update task", function() {
    it("updates task's attributes", function(){
      myDB.updateTask(myFirstProject.id, mySecondTask.taskId, "bake brownies");
 
      myUpdatedSecond = myDB.getIndividualTask(myFirstProject.id, mySecondTask.taskId);
      
      expect(myUpdatedSecond.description).toEqual("bake brownies");
    })
  });

  describe( "remove task", function() {
    it("removes task from project tasks", function() {
      myDB.destroyTask(myFirstProject.id, myFirstTask.taskId);
      
      myUpdatedFirst = myDB.getIndividualTask(myFirstProject.id, myFirstTask.taskId)
      myUpdatedTasks = myDB.getAllTasks(myFirstProject.id);

      expect(myUpdatedFirst).toBeUndefined();
      expect(myUpdatedTasks.length).toEqual(1);
    })
  });

  describe( "retrieve all tasks", function() {
    it("retrieve all tasks assigned to a certain project", function() {
      expect(tasks2.length).toEqual(2);
    })
  });

  // Employee Tests
  describe( "create employee", function() {
    it("creates an employee with a name and a unique id", function() {
      expect(jane.name).toEqual("Jane Doe");
      expect(john.name).toEqual("John Doe");
    })
  });

  describe( "give project access", function() {
    it("gives an employee access to a project", function() {
      myDB.giveEmployeeAccess(jane.id, myFirstProject.id);

      expect(jane.projects).toContain(myFirstProject);
    })
  });

  describe( "assign a task", function() {
    it("assigns a task to an employee if the employee has access to project", function(){
      myDB.giveEmployeeAccess(john.id, myThirdProject.id);
      myDB.assignEmployeeToTask(john.id, myThirdProject.id, myFifthTask.taskId);
      myTasks = myDB.getEmployeeTasks(john.id);
      
      expect(myTasks).toContain(myFifthTask);
      expect(myFifthTask.employees).toContain(john);
    })
  });
})