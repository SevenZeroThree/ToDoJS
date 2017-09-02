$(function() {
    var todos = [];
    var completed = [];
    var toDoId = 1;
    $('#todo-form').submit(function (event) {
        event.preventDefault();

        var newToDo = $('#new-todo').val();
        todos.push({
            'id': toDoId,
            'description': newToDo
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
        for (var i = 0; i < completed.length; i++) {
            var currentToDo = completed[i];
            $('#completed-todos ul').append('<li data-todo-id="' + currentToDo.id + '">' + currentToDo.description + '</li>');
        }
    }
    
    var showInProgressToDos = function () {
        $('#in-progress-todos ul').html('')
        for (var i = 0; i < todos.length; i++) {
            var currentToDo = todos[i];
            $('#in-progress-todos ul').append('<li data-todo-id="' + currentToDo.id + '">' + currentToDo.description + '</li>');
        }
    }

    $('#in-progress-todos ul').on('click', 'li', function() {
        var todoToComplete =  $(this);
        completed.push({
            'id': todoToComplete.data('to-do-id'),
            'description': todoToComplete.text()
        });

        updateToDos();
    })
});