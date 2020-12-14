//variable
const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todoinput');
const todoButton = document.querySelector('.submit');
const filterOption = document.querySelector('.filter-todo');
const weatherInput = document.querySelector('.city-input');
const weatherButton = document.querySelector('.weather-button');

//events
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleted);
todoList.addEventListener('click', checked);
filterOption.addEventListener('change', filterTodo);
weatherButton.addEventListener('click', getWeather);

//function
function addTodo(e){
    e.preventDefault();

    //new tododiv
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    saveLocalStorage({value: todoInput.value, isDone: false})

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

function deleted(e) {
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

}
function checked(e){
    let todos = JSON.parse(localStorage.getItem('todos'))
    let item = e.target;
    if(item.tagName === 'I'){
        item = item.parentElement
    }
    if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;
        const itemText = todo.childNodes[0].innerText;
        const index = todos.findIndex(x => x.value === itemText)
        if (todos[index].isDone === false){
            todos[index].isDone = true;
        }else{
            todos[index].isDone = false;
        }
        localStorage.setItem('todos', JSON.stringify(todos));
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
    todos.forEach(function(todoItem){
         //new tododiv
    const todoDiv = document.createElement('div')
    if(todoItem.isDone === true){
        todoDiv.classList.add('todo')
        todoDiv.classList.toggle('completed')
    }else{
        todoDiv.classList.add('todo')
    }

    //newtodo
    const newTodo = document.createElement('li')
    newTodo.innerText = todoItem.value
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
    const option = document.querySelector('.filter-todo').value
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

function getWeather(e){
    e.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherInput.value}&units=metric&appid=6e93c561fc999601868b5e103fa58d8e`)
        .then((result) => result.json())
        .then((data) => {
            const markup =`
            <h2>${data.name}</h2>
            <div>${Math.floor(data.main.temp)}°C</div>
            <div>min:${Math.floor(data.main.temp_min)}°C / max:${Math.floor(data.main.temp_max)}°C</div>
            `
            document.querySelector('.weather-container').innerHTML = markup
        })
        .catch(err => alert('Wring city name!'))

    weatherInput.value = ''
}