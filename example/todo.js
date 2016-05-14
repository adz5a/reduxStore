"use strict";

var $          = global.jQuery;
var todoStore  = require( "./todoStore" );
var actions    = require( "./actions.js" ),
    status     = require( "./status.js" );
var $todoList  = $( "#todos" );
var todoInput  = $( "#todoInput" );
var renderTodo = require( "./renderTodo" );


var todoListItemsActionCreators = require( "./todoListItemsActionCreators" );


todoStore.subscribe( function () {
    
    var todos = todoStore.getState().todos;
    
    var todoHTML = todos.map( renderTodo ).join( "" );
    
    $todoList.html( todoHTML );
    
} );


$( "#addTodoForm" ).submit( function ( e ) {
    
    e.preventDefault();
    var todo = todoInput.val();
    if ( !todo ) {
        
        alert( "please give me stuff to do" );
        
    } else {
        
        todoStore.dispatch( {
            "type": actions.ADD_TODO,
            "text": todo
        } );
        todoInput.val( "" );
        
    }
    
    return false;
    
} );

$todoList
    .on( "click", ".material-icons", function () {
        
        var action = $( this ).data();
        action.id  = +action.id; // cast a n integer for === comparison
        
        todoStore.dispatch( todoListItemsActionCreators( action, $( this ) ) );
        
    } );


todoStore.dispatch( {
    "type": actions.ADD_TODO,
    "text": "faire une sieste"
} );