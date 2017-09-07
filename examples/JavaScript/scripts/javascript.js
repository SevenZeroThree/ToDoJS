var todos = [];
var toDoId = 1;

var markToDoAsCompleted = function (event) {
    var inProgressElement = event.target;
    var toDoToCompleteId = inProgressElement.getAttribute('data-todo-id');
    var toDo = todos.find(function(todoElement) {
        return todoElement.id == toDoToCompleteId;
    });

    toDo.isActive = false;

    updateToDos();
};

var showCompletedToDos = function () {
    var completedTodosList = document.querySelectorAll('#completed-todos ul')[0];
    completedTodosList.innerHTML = '';

    for (var i = 0; i < todos.length; i++) {
        var currentToDo = todos[i];
        if (!currentToDo.isActive) {
            var listElement = document.createElement('li');
            var toDoContent = document.createTextNode(currentToDo.description);
            listElement.appendChild(toDoContent);
            listElement.setAttribute('data-todo-id', currentToDo.id);
            listElement.setAttribute('class', 'list-group-item');
            completedTodosList.appendChild(listElement);
        }
    }
};

var showInProgressToDos = function () {
    var inProgressToDoList = document.querySelectorAll('#in-progress-todos ul')[0];
    inProgressToDoList.innerHTML = '';

    for (var i = 0; i < todos.length; i++) {
        var currentToDo = todos[i];
        if (currentToDo.isActive) {
            var listElement = document.createElement('li');
            var toDoContent = document.createTextNode(currentToDo.description);
            listElement.appendChild(toDoContent);
            listElement.setAttribute('data-todo-id', currentToDo.id);
            listElement.setAttribute('class', 'list-group-item');
            inProgressToDoList.appendChild(listElement);
            listElement.addEventListener('click', markToDoAsCompleted);
        }
    }
};

var updateToDos = function() {
    showInProgressToDos();
    showCompletedToDos();
};

var todoForm = document.getElementById('todo-form');
todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    var todoTextBox = document.getElementById('new-todo');
    var newToDo = todoTextBox.value;
    
    todos.push({
        'id': toDoId,
        'description': newToDo,
        'isActive': true 
    });
    toDoId++;

    todoTextBox.value = '';

    updateToDos();
});

var resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', function () {
    todos = [];
    updateToDos();
});