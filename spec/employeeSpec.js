describe( "Employee library", function() {
  describe( "create an employee", function() {
    it("creates a employee with an name and a unique id", function(){
      var employee = new TM.Employee({name: "Minnie Mouse", id: 1});

      expect(employee.name).toEqual("Minnie Mouse");
      expect(employee.id).toEqual(1);
    })
  });
})