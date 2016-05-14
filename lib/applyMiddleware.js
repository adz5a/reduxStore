"use strict";

function checkMiddleware ( middleware, i ) {
    if ( typeof middleware !== "function" ) throw new TypeError( "ApplyMiddleware : reducers must be functions, instead reducer " + i + " was typeof " + typeof middleware );
}

function nextFunction ( middlewares ) {
    
    var i = 0, l = middlewares.length;
    
    
}


/**
 * @param ...middlewares - {Function} - middleware functions:
 *                                      they must have the following
 *                                      signature : (dispatch, getState) => next => action
 *                                      where dispatch, getState are the respective store methods
 *                                      and (next => action) a function that takes a next function as
 *                                      a parameter and return an action to dispatch
 * @returns {Function}
 */
module.exports = function () {
    
    var middlewares = Array.prototype.slice.call( arguments, 0 );
    
    middlewares.forEach( checkMiddleware );
    
    /**
     * @param store {Object} - Store instance
     * @param store.dispatch {Function} - store dispatch method
     * @param store.getState {Function} - store getState method
     */
    return function ( store ) {
        
        var
            i                = -1,
            l                = middlewares.length,
            compiledMiddleware,
            nextFunction,
            getState         = store.getState,
            originalDispatch = store.dispatch,
            // this always return the current value of store.dispatch,
            // going through all the middlewares if presents
            dispatch         = function ( action ) {
                return store.dispatch( action );
            };
        
        while ( ++i < l ) {
            
            compiledMiddleware = middlewares[ l - i - 1 ]( getState, dispatch );
            if ( nextFunction ) {
                
                nextFunction = compiledMiddleware( nextFunction );
                
            } else {
                
                nextFunction = compiledMiddleware( originalDispatch );
                
            }
            
            if ( typeof nextFunction !== "function" ) throw new TypeError( "applyMiddleware : the middleware did not return a valid function to be used. At index : " + middlewares.length - l );


        }
        
        if ( typeof nextFunction !== "function" ) throw new TypeError( "applyMiddleware" );
        store.dispatch = function ( action ) {
            
            nextFunction( action );
            return getState();
            
        };

        
        return store;
        
    };
    
};