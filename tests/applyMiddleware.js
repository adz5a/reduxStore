"use strict";
var test            = require( "tape" );
var applyMiddleware = require( "./../applyMiddleware" );
var createStore     = require( "./../createStore" );

var middlewares = applyMiddleware( function ( getState, dispatch ) {
    
    
    return function ( next ) {
        
        return function ( action ) {
            
            console.log( "will dispatch" );
            console.log( JSON.stringify( action, null, 4 ) );
            
            var returnValue = next( action );
            
            console.log( "new state" );
            console.log( JSON.stringify( getState(), null, 4 ) );
            
            
            return returnValue;
            
        }
        
    }
    
    
} );
console.log( middlewares );
var store = createStore( function ( state, action ) {
    
    if ( !state ) state = [];
    
    return state.concat( action );
    
}, [], middlewares );

console.log( store.dispatch );

store.subscribe( function ( state ) {
    
    console.log( JSON.stringify( state, null, 4 ) );
    
} );

store.dispatch( {
    "type": "action"
} );

