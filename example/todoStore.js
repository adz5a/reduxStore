"use strict";

var createStore = require( "./../lib/createStore" );
var actions     = require( "./actions.js" );
var status      = require( "./status.js" );

module.exports = createStore( function ( state, action ) {
    
    if ( !state ) state = {
        "todos": []
    };
    if ( !action ) return state;
    
    switch ( action.type ) {
        
        case actions.ADD_TODO:
            
            state = {
                "todos": state.todos.concat( {
                    "text"  : action.text,
                    "id"    : action.id,
                    "status": status.PENDING
                } )
            };
            
            break;
        
        case actions.DELETE_TODO:
            
            state = {
                "todos": state.todos.map( function ( todo ) {
                    
                    return {
                        "id"    : todo.id,
                        "text"  : todo.text,
                        "status": todo.id === action.id ? status.DELETED : todo.status
                    };
                    
                } )
            };
            
            
            break;
        
        case actions.EDIT_TODO:
            
            state = {
                "todos": state.todos.map( function ( todo ) {
                    
                    return {
                        "id"    : todo.id,
                        "text"  : todo.text,
                        "status": todo.id === action.id ? status.EDITING : todo.status
                    };
                    
                } )
            };
            
            break;
        
        case actions.RESOLVE_TODO:
            
            state = {
                "todos": state.todos.map( function ( todo ) {
                    
                    return {
                        "id"    : todo.id,
                        "text"  : todo.text,
                        "status": todo.id === action.id ? status.RESOLVED : todo.status
                    };
                    
                } )
            };
            
            break;
        
        default:
            
            alert( "not catched" );
            alert( action );
            break;
        
    }
    
    return state;
}, {
    "todos": []
} );