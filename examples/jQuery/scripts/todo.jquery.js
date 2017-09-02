$(function() {
    var todos = [];
    var completed = [];
    var toDoId = 1;
    $('#todo-form').submit(function (event) {
        event.preventDefault();

        var newToDo = $('#new-todo').val();
        todos.push({
            'id': toDoId,
            'description': newToDo,
            'isActive': true 
        });
        toDoId++;

        $('#new-todo').val('');

        updateToDos();
    });

    var updateToDos = function() {
        showInProgressToDos();
        showCompletedToDos();
    }

    var showCompletedToDos = function () {
        $('#completed-todos ul').html('')
        for (var i = 0; i < todos.length; i++) {
            var currentToDo = todos[i];
            if (!currentToDo.isActive) {
                $('#completed-todos ul').append('<li data-todo-id="' + currentToDo.id + '">' + currentToDo.description + '</li>');
            }
        }
    }
    
    var showInProgressToDos = function () {
        $('#in-progress-todos ul').html('')
        for (var i = 0; i < todos.length; i++) {
            var currentToDo = todos[i];
            if (currentToDo.isActive) {
                $('#in-progress-todos ul').append('<li data-todo-id="' + currentToDo.id + '">' + currentToDo.description + '</li>');
            }
        }
    }

    $('#in-progress-todos ul').on('click', 'li', function() {
        var todoToComplete =  $(this);
        var toDo = todos.find(function(todoElement) {
            return todoElement.id == todoToComplete.data('todo-id');
        });

        toDo.isActive = false;

        updateToDos();
    })
});