var $loginButton = $("#loginButton");
var $logOutButton = $("#logOutButton");
var list = document.getElementById("list");
var taskInput = document.getElementById("taskInput");
var btnNewTask = document.getElementById("addButton");
var user, body, task, newTask, link, content, postData, newPostKey, updates;


$(function () {
  document.getElementById("addButton").addEventListener("click", addThisTask);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);
    } else {
      console.log("No user");
      console.log(user);
    }
  });
  $loginButton.on('click', signIn);
  $logOutButton.on('click', LogOut);
  firebase.database().ref().on("value", getFirebase);
});

function getFirebase(snapshot) {
  var data = snapshot.val();
  console.log(data);
  
  var output = "";
  $.each(data, function (key) {
    output += Mustache.render($("#commentTemplate").html(), data[key]);
  });
  $("#content").html(output);
}

function addThisTask() {

  user = firebase.auth().currentUser;
  console.log("User is: " + user);
  body = taskInput.value;
  
  newTask = document.createElement("li");
  link = document.createElement("a");
  content = document.createTextNode(body);
  
  link.appendChild(content);
  link.setAttribute("href", "#");
  newTask.appendChild(link);
  list.appendChild(newTask);
  
  taskInput.value = "";
  btnNewTask.addEventListener("click", addThisTask);
  taskInput.addEventListener("click", verifyInput);

  if (body == "") {
    taskInput.setAttribute("placeholder", "add a real task");
    taskInput.className = "error";
    return false;
  }
  for (var i = 0; i <= list.children.length - 1; i++) {
    list.children[i].addEventListener("click", function () {
      this.parentNode.removeChild(this);
    });

  }
  for (var i = 0; i <= list.children.length - 1; i++) {
    list.children[i].addEventListener("click", deleteTask);
  }

  firebase.database().ref().push({
        "user": firebase.auth().currentUser.email,
		"body": body,
		"timestamp": (new Date()).getTime()
  });
  
  location.reload;
}

function signIn() {
  firebase.auth().signInWithEmailAndPassword($("#e-mail").val(), $("#password").val()).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function verifyInput() {
  taskInput.className = "";
  taskInput.setAttribute("placeholder", "add your task");
}

function deleteTask() {
  this.parentNode.removeChild(this);
}

function LogOut() {
  console.log("Logging out");
  firebase.auth().signOut();
}
