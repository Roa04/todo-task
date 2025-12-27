// array to storee the tasks
let todos = [];

// loadingg the tasks fromlocalStorage
const savedTodos = localStorage.getItem("todos");
if (savedTodos) {
  todos = JSON.parse(savedTodos);
}

// saving the tasks inlocalStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// main element in the page
const input = document.getElementById("New-Todo");
const addBtn = document.querySelector("button");
const section = document.querySelector(".todo-section");
const filterButtons = document.querySelectorAll(".filter-buttons .btn");
const noTasksMessage = document.querySelector(".no-tasks");

// add btn
addBtn.addEventListener("click", addTodo);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTodo();
});

let currentFilter = "All";
let taskToDeleteId = null;
let currentTaskId = null;

// adding neew task
function addTodo() {
  const taskText = input.value.trim();
  if (!taskText) {
    document.getElementById("error-message").textContent = "Please enter a task.";
    return;
  }

let firstCharCode = taskText.charCodeAt(0);
    console.log("first char = "+firstCharCode);
    if (!(firstCharCode >=65 && firstCharCode <=90 || firstCharCode >=97 && firstCharCode <=122) ) { // 32 هو كود المسافة
      document.getElementById("error-message").textContent = "Task must start with a just character";
      return;
    }

  document.getElementById("error-message").textContent = "";

  const newTodo = {
    id: Date.now(),
    text: taskText,
    done: false
  };

  todos.push(newTodo);
  input.value = "";
  saveTodos();
  renderTodos(currentFilter);