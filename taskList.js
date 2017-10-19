(function () {
  //  variables
  var list = document.getElementById("list"),
      taskInput = document.getElementById("taskInput"),
      btnNewTask = document.getElementById("addButton");

  //  functions
  var addThisTask = function () {
    var task = taskInput.value,
        newTask = document.createElement("li"),
      link = document.createElement("a");
    content = document.createTextNode(task);

    if (task == "") {
      taskInput.setAttribute("placeholder", "add a real task");
      taskInput.className = "error";
      return false;
    }
    //    time to add the content to the link
    link.appendChild(content);
    //we create an attribe href to be able to click on the task
    link.setAttribute("href", "#");
    //time to add the link to the new task (which is a "li")
    newTask.appendChild(link);

    list.appendChild(newTask);

    taskInput.value = "";

    for (var i = 0; i <= list.children.length - 1; i++) {
      list.children[i].addEventListener("click", function () {

        this.parentNode.removeChild(this);
      })

    }
  };

  var verifyInput = function () {
    taskInput.className = "";
    taskInput.setAttribute("placeholder", "add your task");
  };
  var deleteTask = function () {
    this.parentNode.removeChild(this);
  };

  //  events

  //  this function adds a task
  btnNewTask.addEventListener("click", addThisTask);

  //  verify the input
  taskInput.addEventListener("click", verifyInput);
  //to delete the input once the task is done
  for (var i = 0; i <= list.children.length - 1; i++) {
    list.children[i].addEventListener("click", deleteTask);
  }

}());
