$(document).ready(function(){
  var myDB = DB.getDB();

  $('#submit-btn').click(function(e) {
    e.preventDefault();
    var projectTitle = $('#project').val();

    insertIntoDB(myDB, projectTitle);
    $('#project').val(" ");
    $('#task-stuff').show();
  });

  var insertIntoDB = function(db, title) {
    var project = db.createProject(title);
    return project;
  }
});
