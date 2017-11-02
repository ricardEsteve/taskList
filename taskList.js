var $loginButton = $("#loginButton");
var $logOutButton = $("#logOutButton");
var list = document.getElementById("list");
var taskInput = document.getElementById("taskInput");
var btnNewTask = document.getElementById("addButton");
var user, body, task, newTask, link, content, postData, newPostKey, updates;




$(function () {
  document.getElementById("addButton").addEventListener("click", addThisTask);
  taskInput.addEventListener("click", clearError);


  firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {

      $("#panelSignIn").hide();
      $("#logOutButton").show();
      $("#panelContent").show();


    } else {
      $("#panelSignIn").show();
      $("#logOutButton").hide();
      $("#panelContent").hide();

    }
  });
  $loginButton.on('click', signIn);
  $logOutButton.on('click', LogOut);

  firebase.database().ref("ddbb").on("value", getFirebase);


});

function getFirebase(snapshot) {
  var data = snapshot.val();
  
  $(".list").empty();
  
  for(key in data){
    console.log(data[key]);
    $(".list").append($("<li/>").addClass("everyTask").attr("id", key).text("X " + data[key].body));
  }
  $(".everyTask").on("click", function () {
    var key= $(this).attr("id");
    deleteTask(key);
  });
 
}


//$('.delete').on('click', function () {
//  deletenewTask(this.id);
//});



function addThisTask() {

  user = firebase.auth().currentUser.email;
  console.log("User is: " + user);
  body = taskInput.value;
  taskInput.value = "";

  if (body == "") {
    taskInput.setAttribute("placeholder", "add a real task");
    taskInput.className = "error";
    return;
  }

  findTheUserId(body);

}

function findTheUserId(body) {
  newTask = document.createElement("li");
  link = document.createElement("a");
  content = document.createTextNode(body);
  link.appendChild(content);
  link.setAttribute("href", "#");
  newTask.appendChild(link);
  list.appendChild(newTask);
  newTask.addEventListener("click", function () {
    this.parentNode.removeChild(this);
  });
  newTask.addEventListener("click", function(){
    deleteTask(key);
  });

  firebase.database().ref("ddbb").push({
    "user": firebase.auth().currentUser.email,
    "body": body,
    "timestamp": (new Date()).getTime()
  });

}

function deleteTask(key) {
 
  
  
  firebase.database().ref("ddbb").child(key).remove();
  getFirebase();

}




function signIn() {
  firebase.auth().signInWithEmailAndPassword($("#e-mail").val(), $("#password").val()).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function clearError() {
  taskInput.className = "";
  taskInput.setAttribute("placeholder", "add your task");
}


function LogOut() {
  console.log("Logging out");
  firebase.auth().signOut();
}
