describe('PersistDB', function() {
  var myDB;
  var firstProject;
  var secondProject;

  myDB = TM.getDB();

  firstProject = myDB.createProject("My Project");
  secondProject = myDB.createProject("My Second Project");
  thirdProject = myDB.createProject("My Third Project");

  describe('creates a singleton', function() {
    it('creates only one instance of a DB, even when called twice', function() {
      var db1 = TM.getDB();
      var db2 = TM.getDB();

      expect(db1 === db2).toEqual(true);
    })
  });

  describe('create a project', function() {
    it('creates a project with a unique id and name', function() {

      expect(firstProject.id).toEqual(1);
      expect(secondProject.id).toEqual(2);
    })
  });

  describe('get project from id', function() {
    it('get individual project from id', function() {
      var grabProject = myDB.getIndividualProject(2);

      expect(grabProject.name).toEqual("My Second Project");
    })
  });

  describe('get all projects', function() {
    it('gets all projects in db', function() {
      var projectArray = myDB.getAllProjects();

      expect(projectArray.length).toEqual(3);
    })
  });

  describe('updates project', function() {
    it('updates a project by id', function() {
      myDB.updateProject(3, {name: "Par-tay!"});
      var updatedProject = myDB.getIndividualProject(3);

      expect(updatedProject.name).toEqual("Par-tay!");
    })
  });

  describe('removes a project', function() {
    it('removes a project by id', function() {
      fourthProject = myDB.createProject("My Fourth Project");
      expect(fourthProject.id).toEqual(4);

      myDB.destroyProject(4);
      var removedProject = myDB.getIndividualProject(4)

      expect(removedProject).toBeUndefined();
    })
  });

  describe('creates a task', function() {
    it('creates a task with a unique id and description, tied to a project id', function() {
      var firstTask = myDB.createTask(1, {description: "bake cookies"});

      expect(firstTask.id).toEqual(1);
      expect(firstTask.description).toEqual("bake cookies");
      expect(firstTask.projectId).toEqual(1);
    })
  });

  describe('get task', function() {
    it('gets individual task by task id', function() {
      var secondTask = myDB.createTask(1, {description: "mow grass"});
      var thirdTask = myDB.createTask(2, {description: "grocery shopping"});
      var retrievedTask = myDB.getIndividualTask(2);

      expect(secondTask.description).toEqual(retrievedTask.description);
    })

    it('get tasks associated with a particular project by project id', function() {
      var Project1Tasks = myDB.getTasksByProject(1);

      expect(Project1Tasks.length).toEqual(2);
    })
  })

  describe('gets all tasks', function() {
    it('gets all tasks available in database', function() {
      var allTasks = myDB.getAllTasks();

      expect(allTasks.length).toEqual(3);
    })
  })

  describe('updates task', function() {
    it('updates task description by task id', function() {
      var third = myDB.getIndividualTask(3);
      expect(third.description).toEqual("grocery shopping");

      myDB.updateTask(3, {description: "sweep floor"});
      var updatedTask = myDB.getIndividualTask(3);

      expect(updatedTask.description).toEqual("sweep floor");
    })
  })

  describe('remove a task', function() {
    it('removes a task by task id', function() {
      var fourthTask = myDB.createTask(2, {description: "write code"});
    
      myDB.destroyTask(4);

      var project2Tasks = myDB.getTasksByProject(2);
      console.log(project2Tasks);
      expect(project2Tasks.length).toEqual(1);
    })
  })
})