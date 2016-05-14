"use strict";

var undefined;
function forEachReducers ( reducers, cb ) {
    
    Object.keys( reducers ).forEach( function ( name ) {
        
        cb( reducers[ name ], name );
        
    } );
    
}

module.exports = function ( reducers ) {
    
    forEachReducers( reducers, function ( reducer, reducerName ) {
        
        if ( typeof reducers[ reducerName ] !== "function" ) {
            
            throw new TypeError( "combineReducers : reducers must be functions, instead reducert " + reducerName + " was of type " + typeof reducers[ reducerName ] );
            
        }
        
    } );
    
    // we clone the object to avoid user deleting keys
    // use store.replaceReducer instead.
    var currentReducers = {};

    forEachReducers( reducers, function ( reducer, name ) {

        if ( typeof reducer === "function" ) currentReducers[ name ] = reducers;

    } );
    
    
    return function ( state, action ) {

        var nextState = {};
        forEachReducers( currentReducers, function ( reducer, name ) {
            
            var reducerState = reducer( state, action );
            if ( reducerState === undefined ) throw new TypeError( "store.combineReducers : " + name + " has returned undefined state" );

            nextState[ name ] = reducerState;

        } );

        return nextState;

    }
    
    
};