"use strict";

var $          = global.jQuery;
var todoStore  = require( "./todoStore" );
var actions    = require( "./actions.js" ),
    status     = require( "./status.js" );
var $todoList  = $( "#todos" );
var todoInput  = $( "#todoInput" );
var renderTodo = require( "./renderTodo" ),
    todoForm   = require( "./todoForm" );


var todoListItemsActionCreators = require( "./todoListItemsActionCreators" );


todoStore.subscribe( function () {
    
    var todos = todoStore.getState().todos;
    
    var todoHTML = todos.map( renderTodo ).join( "" );
    
    $todoList.html( todoHTML );
    
} );


$todoList
    .on( "click", ".updateTodo", function () {

        var $t    = $( this ),
            action;
        action    = $t.data();
        action.id = +action.id;

        todoStore.dispatch( todoListItemsActionCreators( action, $t.parentsUntil( ".collection-item" ) ) )

    } );


todoStore.dispatch( {
    "type": actions.ADD_TODO,
    "text": "faire une sieste"
} );