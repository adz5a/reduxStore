"use strict";

var $         = global.jQuery;
var todoStore = require( "./todoStore" );
var actions   = require( "./actions.js" ),
    status    = require( "./status.js" );
var todoList  = $( "#todos" );
var todoInput = $( "#todoInput" );
var todoId    = 0;

todoStore.subscribe( function () {
    
    var todos = todoStore.getState().todos;
    
    var todoHTML = todos.map( function ( todo ) {
        
        
        return "<li class='collection-item " + todo.status + "'>" + todo.text + "" +
            "<i class='material-icons' data-type='" + actions.RESOLVE_TODO + "' data-id='" + todo.id + "'>done</i>" +
            "<i class='material-icons' data-type='" + actions.DELETE_TODO + "' data-id='" + todo.id + "'>delete</i>" +
            "<i class='material-icons' data-type='" + actions.EDIT_TODO + "' data-id='" + todo.id + "'>mode_edit</i>" +
            "</li>";
        
    } ).join( "" );
    
    todoList.html( todoHTML );
    
} );


$( "#addTodoForm" ).submit( function ( e ) {
    
    e.preventDefault();
    var todo = todoInput.val();
    if ( !todo ) {
        
        alert( "please give me stuff to do" );
        
    } else {
        
        todoStore.dispatch( {
            "type": actions.ADD_TODO,
            "text": todo,
            "id"  : todoId
        } );
        todoId++;
        todoInput.val( "" );
        
    }
    
    return false;
    
} );

todoList
    .on( "click", ".material-icons", function () {
        
        var action = $( this ).data();
        action.id  = +action.id;//cast id as an integer
        console.log( action );
        todoStore.dispatch( action );
        
        
    } );
