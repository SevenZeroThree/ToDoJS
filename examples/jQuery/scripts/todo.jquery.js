$(function() {
    var todos = [];
    var completed = [];

    $('#todo-form').submit(function (event) {
        event.preventDefault();

        var newToDo = $('#new-todo').val();
        todos.push(newToDo);
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
            $('#completed-todos ul').append('<li>' + currentToDo + '</li>');
        }
    }
    
    var showInProgressToDos = function () {
        $('#in-progress-todos ul').html('')
        for (var i = 0; i < todos.length; i++) {
            var currentToDo = todos[i];
            $('#in-progress-todos ul').append('<li>' + currentToDo + '</li>');
        }
    }

    $('#in-progress-todos ul').on('click', 'li', function() {
        var todoToComplete =  $(this).text();
        completed.push(todoToComplete);

        updateToDos();
    })
});