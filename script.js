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

