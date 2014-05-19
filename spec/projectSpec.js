describe( "Project library", function() {
  describe( "create a project", function() {
    it("creates a project with an name and a unique id", function(){
      var project = new Project({name: "My Project", id: 1});

      expect(project.name).toEqual("My Project");
      expect(project.id).toEqual(1);
    })
  });
})