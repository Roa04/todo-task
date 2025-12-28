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
}
// Display tasks by filter
function renderTodos(filter = "All") {
  section.querySelectorAll(".task").forEach(task => task.remove());

  let filtered = todos;
  if (filter === "Done") {
    filtered = todos.filter(todo => todo.done);
  } else if (filter === "Todo") {
    filtered = todos.filter(todo => !todo.done);
  }

  noTasksMessage.style.display = filtered.length ? "none" : "block";

  filtered.forEach(todo => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";

    const checked = todo.done ? "checked" : "";
    const doneClass = todo.done ? "done-task" : "";

    taskEl.innerHTML = `
      <div class="task-content">
        <span class="${doneClass}">${todo.text}</span>
        <div class="task-actions">
          <input type="checkbox" ${checked} onchange="toggleDone(${todo.id})">
          <i class="fas fa-pen edit-icon" onclick="editTodo(${todo.id})"></i>
          <i class="fas fa-trash delete-icon" onclick="deleteTodo(${todo.id})"></i>
        </div>
      </div>
    `;

    section.appendChild(taskEl);
  });
}