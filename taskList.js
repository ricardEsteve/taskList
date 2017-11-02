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
  console.log(data);
  var output = "";
  $.each(data, function (key) {
    output += Mustache.render($("#commentTemplate").html(), data[key]);
  });
  $("#content").html(output);
}

$('.delete').on('click', function () {
				deletePost(this.id);
			});
function deletePost(body) {
		var arrayKeys = body.split('+');
		var id = arrayKeys[0];
		var key = arrayKeys[1];
		firebase.database().ref(id).child(key).remove();
		getPosts(id);
	}


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
  newTask.addEventListener("click", deleteTask);

  firebase.database().ref("ddbb").push({
    "user": firebase.auth().currentUser.email,
    "body": body,
    "timestamp": (new Date()).getTime()
  });

}

function deleteTask() {
  firebase.database().ref("ddbb").remove();
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

//function deleteTask() {
//  this.parentNode.removeChild(this);
//}

function LogOut() {
  console.log("Logging out");
  firebase.auth().signOut();
}

