"use strict";

var createStore = require( "./../lib/createStore" );
var logger      = require( "./../lib/applyMiddleware" )( ( getState, dispatch ) => next => action => {

    console.log( action );
    var returnValue = next( action );

    console.log( getState() );

    return returnValue;


} );
var actions     = require( "./actions.js" );
var status      = require( "./status.js" );

module.exports = createStore( function ( state, action ) {
    
    if ( !state ) state = {
        "todos"       : [],
        "currentIndex": 0
    };
    if ( !action ) return state;
    
    switch ( action.type ) {
        
        case actions.ADD_TODO:
            
            return Object.assign( {}, state, {
                todos: state.todos.concat( {
                    text  : action.text,
                    id    : state.currentIndex,
                    status: status.PENDING
                } )
            }, {
                currentIndex: state.currentIndex + 1
            } );
            
            break;
        
        case actions.DELETE_TODO:
            
            return Object.assign( {}, state, {
                "todos": state.todos.map( function ( todo ) {
                    
                    return {
                        "id"    : todo.id,
                        "text"  : todo.text,
                        "status": todo.id === action.id ? status.DELETED : todo.status
                    };
                    
                } )
            } );
            
            
            break;
        
        case actions.EDIT_TODO:
            
            return Object.assign( {}, state, {
                "todos": state.todos.map( function ( todo ) {
                    
                    return {
                        "id"    : todo.id,
                        "text"  : todo.text,
                        "status": todo.id === action.id ? status.EDITING : todo.status
                    };
                    
                } )
            } );
            
            break;
        
        case actions.RESOLVE_TODO:
            
            return Object.assign( {}, state, {
                "todos": state.todos.map( function ( todo ) {
                    
                    return {
                        "id"    : todo.id,
                        "text"  : todo.text,
                        "status": todo.id === action.id ? status.RESOLVED : todo.status
                    };
                    
                } )
            } );
            
            break;

        case actions.UPDATE_TODO:

            return Object.assign( {}, state, {
                "todos": state.todos.map( function ( todo ) {

                    if ( todo.id === action.id ) {

                        return {
                            "id"    : todo.id,
                            "text"  : action.text,
                            "status": status.PENDING
                        };

                    }

                    return todo;

                } )
            } );

            break;

        case actions.CANCEL_TODO_UPDATE:

            return Object.assign( {}, state, {
                "todos": state.todos.map( function ( todo ) {

                    if ( todo.id === action.id ) {

                        return {
                            "id"    : todo.id,
                            "text"  : todo.text,
                            "status": status.PENDING
                        };

                    }

                    return todo;

                } )
            } );

            break;
        
        default:
            
            return state;
        
    }

}, undefined, logger );