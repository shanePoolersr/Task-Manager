let isImportant = false;

function saveTask() {
  // get the values
  const title = $("#txtTitle").val();
  const desc = $("#txtDescription").val();
  const color = $("#selColor").val();
  const date = $("#selStartDate").val();
  const status = $("#selStatus").val();
  const budget = $("#selBudget").val();

  // build an object
  let taskToSave = new Task(
    isImportant,
    title,
    desc,
    color,
    date,
    status,
    budget
  );

  console.log(taskToSave);

  // save to server
  $.ajax({
    type: "POST",
    url: "http://fsdiapi.azurewebsites.net/api/tasks/", //This is a service 
     data:JSON.stringify(task),
    contentType: "application/json",
    success: function(response) {
        console.log(response);
        // display the task
  displayTask(taskToSave);
    },
    error: function (error) {
        console.log(error);
        alert("something went wrong");
        
    }
});


  
  clearForm();
}

function displayTask(task) {
  let syntax = `<div class='task' style='border-color:${task.color}'>
        <div class='info'>
          <h5>${task.title}</h5>
          <p>${task.description}</p>
        </div>
  
        <label class='status'>${task.status}</label>
  
        <div class='date-budget'>
          <label>${task.startDate}</label>
          <label>${task.budget}</label>
        </div>

        </div>`;

  $(".pending-tasks").append(syntax);
}

function toggleImportant() {
  const nonImportantIcon = "fa fa-fire";
  const importantIcon = "fa-solid fa-fire important-icon";

  if (isImportant) {
    $("#iImportant").removeClass(importantIcon);
    $("#iImportant").addClass(nonImportantIcon);
    isImportant = false;
  } else {
    $("#iImportant").removeClass(nonImportantIcon);
    $("#iImportant").addClass(importantIcon);
    isImportant = true;
  }
}

function toggleVisibility(){
    if(isVisible) {
        $("#form").fadeOut(); // fadeOut
        isVisible = false;
    }

    else {
        $("form").fadeIn();
        isVisible = true; // fadeIn
    }
}

function clearForm(){
    $('#txtTitle').val(''); 
    $('#txtDescription').val(''); 
    $('#selColor').val('#00000'); 
    $('#selStarDate').val(''); 
    $('#selStatus').val(''); 
    $('#txtBudget').val(''); 
}
function testRequest() {
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net", //This is a service 
        success: function(response) {
            console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
    });

}
function loadTask(){
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks", //This is a service 
        success: function(response) {
        let data =JSON.parse(response);//i will convert the
            //response into a JSON
            //console.log(response);
            //find the elements in the server that contains title:marked
            //render only those elements in the taskManager Panel
            for (let i = 0; i < data.length; i++){
                let task =data[i];
                if (task.title == "Market"){
                    displayTask(task);
                }
            }
      
        },
        error: function (error) {
            console.log(error);
            alert("something went wrong");
            
        }
    });
}



//create a function that uses the
// get request "http://fsdiapi.azurewebsites.net/api/tasks"
//console log the request from the server.
//call the function in the init()
function init() {
  console.log("task manager");
  

  // load data
  loadTask();

  // hook events
  $("#btnSave").click(saveTask);
  $("#iImportant").click(toggleImportant);
  $("btnDetails").click(toggleVisibility);
  
  
}

window.onload = init;

/**
 * toggleImportant
 *
 */
