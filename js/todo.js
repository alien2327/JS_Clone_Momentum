const form_todo = document.querySelector(".js-todo");
const input_todo = form_todo.querySelector("input");
const list_todo = document.querySelector(".js-todoList");

const TODOS_LS = 'todos';

let todolist = [];

function delTodo(event) {
    const btn = event.target;
    const target_li = btn.parentNode;
    list_todo.removeChild(target_li);
    const cleanTodos = todolist.filter(function(element) {
        return element.id !== parseInt(target_li.id);
    });
    todolist = cleanTodos;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todolist));
}

function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = todolist.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", delTodo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    list_todo.appendChild(li);
    const todoObj = {
        text: text,
        id: newId
    };
    todolist.push(todoObj);
    saveTodos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input_todo.value;
    paintTodo(currentValue);
    input_todo.value = "";
}

function loadTodos() {
    const load_todo = localStorage.getItem(TODOS_LS);
    if (load_todo !== null) {
        const parsedTodos = JSON.parse(load_todo);
        parsedTodos.forEach(function(element) {
            paintTodo(element.text);
        });
    }
}

function init() {
    loadTodos();
    form_todo.addEventListener("submit", handleSubmit);
}

init();