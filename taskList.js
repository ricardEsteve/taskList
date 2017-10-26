$(function () {

  var $loginButton = $("#loginButton");
  var $logOutButton = $("#logOutButton");
  var list = document.getElementById("list");
  var taskInput = document.getElementById("taskInput");
  var btnNewTask = document.getElementById("addButton");
  //  var provider = new firebase.auth.GoogleAuthProvider();
  //  provider.addScope('https://www.googleapis.com/auth/plus.login');
  //  firebase.auth().signInWithRedirect(provider);



  document.getElementById("addButton").addEventListener("click", addThisTask);

  function addThisTask() {
    
    var user=firebase.auth().currentUser.email;
    var body= taskInput.value;
    
    var postData = {
      user: user,
      body: body,
    };


    var task = taskInput.value;
    var newTask = document.createElement("li");
    var link = document.createElement("a");
    var content = document.createTextNode(task);


    function signIn() {
      firebase.auth().signInWithEmailAndPassword($("#e-mail").val(), $("#password").val()).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    }

    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        $("#e-mail").val();
        $("#password").val();
        $("#panelSignIn").hide();
        $("#logOutButton").show();

      } else {
        $("#panelSignIn").show();
        $("#logOutButton").hide();
      }
    });

    $loginButton.on('click', function () {
      var $email = $("#e-mail");
      var $password = $("#password");

      firebase.auth().signInWithEmailAndPassword($("#e-mail").val(), $("#password").val()).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    });


    $logOutButton.on('click', function () {
      firebase.auth().signOut();

    });



    var verifyInput = function () {
      taskInput.className = "";
      taskInput.setAttribute("placeholder", "add your task");
    };
    var deleteTask = function () {
      this.parentNode.removeChild(this);
    };


    if (task == "") {
      taskInput.setAttribute("placeholder", "add a real task");
      taskInput.className = "error";
      return false;
    }

    link.appendChild(content);
    link.setAttribute("href", "#");
    newTask.appendChild(link);

    list.appendChild(newTask);

    taskInput.value = "";

    btnNewTask.addEventListener("click", addThisTask);

    taskInput.addEventListener("click", verifyInput);


    for (var i = 0; i <= list.children.length - 1; i++) {
      list.children[i].addEventListener("click", function () {

        this.parentNode.removeChild(this);
      })

    }

    getCurrentUser();

    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    firebase.database().ref().update(updates);

    function getCurrentUser() {
      return firebase.auth().getCurrentUser;

    }


    for (var i = 0; i <= list.children.length - 1; i++) {
      list.children[i].addEventListener("click", deleteTask);
    }

  }

});





//document.getElementById("login").addEventListener("click", login);
//document.getElementById("create-post").addEventListener("click", function() {
//    writeNewPost(getCurrentUserUid(), "yujuu");
//});
//
//function writeNewPost(uid, body) {
//  // A post entry.
//  var postData = {
//    uid: uid,
//    body: body,
//  };
//
//  // Get a key for a new Post.
//  var newPostKey = firebase.database().ref().child('posts').push().key;
//  
//  var updates = {};
//  updates['/posts/' + newPostKey] = postData;
//
//  return firebase.database().ref().update(updates);
//}
//
//function getCurrentUserUid() {
//    return firebase.auth().currentUser.uid;
//}
//
//function login() {
//    var provider = new firebase.auth.GoogleAuthProvider();
//    firebase.auth().signInWithPopup(provider);
//}
//
//function getPosts() {
//    
// firebase.database().ref('/posts/').on('value').then(function(snapshot) {
//    console.log(snapshot.val());
//  });
//
//}
