$(document).ready(function(){
  var myDB = TM.getDB();
  var x = 1; 
  var y = 1;

  $('#project-btn').click(function(e) {
    e.preventDefault();
    data = "project" + x;
    var projectTitle = $('#project').val();
      
    if (projectTitle !== " ") {
      $('#project').val(" ");
      $('#task-stuff').show();
      
      var project = myDB.createProject(projectTitle);
    
      // localStorage.setItem(data, project.id);
      x++;

      displayProject(projectTitle); 
    
    } else {
    
      alert("Oops, didn't catch that!");
    }
  });

  $('#task-btn').on('click', function(e) {
    e.preventDefault();
    dataT = "task" + y;
    var taskDescription = $('#task').val();
    
    if (taskDescription !== " ") {
      $('#task').val(" ");

      var result = localStorage.getItem(data);

      var task = myDB.createTask({projectId: result, description: taskDescription})
   
      localStorage.setItem(dataT, task.id);
      y++;
   
      displayTask(taskDescription);
   
    } else {
      alert("Oops, didn't catch that!");
    }
  });

  $("#output-wrapper").on('click', 'li', function() {
    var resultP = localStorage.getItem(data);
    var resultT = localStorage.getItem(dataT);
    myDB.completedTask(resultP, resultT);
    $('li span').addClass('strike');
  });

  var displayProject = function(text) {
    var project = "<h2>" + text + "</h2>";
    $('#output-wrapper').append(project);
  }

  var displayTask = function(text) {
    var task = "<li> <span>" + text + "</span>&nbsp;&nbsp;&nbsp;<a href='#' id='complete'>&#10004;</a></li>";
    $('#output-wrapper').append(task);
  }

});


// Build out User Interface for db
// Work on persistance using local storage