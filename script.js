document.addEventListener('DOMContentLoaded', loadTodos);

const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

addButton.addEventListener('click', addTodo);

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToList(todo.text, todo.id));
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;

    const id = Date.now();
    addTodoToList(text, id);

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text, id });
    localStorage.setItem('todos', JSON.stringify(todos));

    todoInput.value = '';
}

function addTodoToList(text, id) {
    const li = document.createElement('li');
    li.setAttribute('data-id', id);

    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.addEventListener('click', () => editTodo(id));
    li.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => deleteTodo(id));
    li.appendChild(deleteButton);

    todoList.appendChild(li);
}

function editTodo(id) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        const newText = prompt('Edit to-do:', todo.text);
        if (newText) {
            todo.text = newText;
            localStorage.setItem('todos', JSON.stringify(todos));
            updateTodoList();
        }
    }
}

function deleteTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    updateTodoList();
}

function updateTodoList() {
    todoList.innerHTML = '';
    loadTodos();
}
