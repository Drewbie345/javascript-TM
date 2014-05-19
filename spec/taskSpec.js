describe( "Task library", function() {
  describe( "create a task", function() {
    it("creates a task with an project id, a description, and a unique id", function(){
      var task = new Task({projectId: 1, description: "pay bills", id: 1});

      expect(task.projectId).toEqual(1);
      expect(task.description).toEqual("pay bills");
      expect(task.id).toEqual(1);
    })
  });
})