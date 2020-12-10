//variable
const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todoinput');
const todoButton = document.querySelector('.submit');
const filterOption = document.querySelector('.filter-todo');

//events
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.onchange = function() {filterTodo()}

//function
function addTodo(e){
    e.preventDefault();

    //new tododiv
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    saveLocalStorage(todoInput.value)

    //newtodo
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //completed button

    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>'
    completedButton.classList.add('completed-btn')
    todoDiv.appendChild(completedButton)

    //trash button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)


    todoInput.value = ''

}

function deleteCheck(e) {
    let item = e.target;
    if (item.tagName === 'I'){
        item = item.parentElement
    }
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removalLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }
    if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

function saveLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
         //new tododiv
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    //newtodo
    const newTodo = document.createElement('li')
    newTodo.innerText = todo
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //completed button

    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>'
    completedButton.classList.add('completed-btn')
    todoDiv.appendChild(completedButton)

    //trash button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)

    })
}

function removalLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function filterTodo(){
    const todos = todoList.childNodes;
    const option = filterOption.value
    todos.forEach(function(todo){
        switch(option){
            case "all":
                todo.style.display = 'flex'
                break;
            case "completed":
                if (todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}