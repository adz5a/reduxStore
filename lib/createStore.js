module.exports = function createStore ( reducer, initialState, enhancer ) {
    
    "use strict";
    
    var tr = typeof reducer,
        ti = typeof initialState,
        te = typeof enhancer;

    //TODO: add test for this
    if ( tr !== "function" ) {
        
        throw  new TypeError( "Store : reducer must be a function" );
        
    }

    //TODO: add test for this
    if ( ti !== "undefined" && !(ti === "object") ) {
        
        throw new TypeError( "Store : initial state must be an object" );
        
    }
    
    var context = {
        "state"           : initialState,
        "subscribers"     : [],
        "nextSubscriberId": 0,
        "reducer"         : reducer,
        "isDispatching"   : false
    };

    /**
     * Store object declaration
     * @typedef store
     * @type Object
     * @property {Function} dispatch
     * @property {Function} subscribe
     * @property {Function} getState
     */
    var store = {
        /**
         *
         * @param action - a plain Object to be dispatched
         * @returns action - the same plain object
         */
        "dispatch" : function ( action ) {

            if ( context.isReducing === true ) {

                //TODO: add test for this one
                throw new Error( "Store : trying to dispatch an action inside the reducer" );
                
            }

            if ( typeof action !== "object" ) {

                throw new TypeError( "Store : action must be a plain object, instead was of type : " + typeof action );

            }

            context.isReducing = true;
            try {

                context.state = context.reducer( context.state, action );

            } finally {

                context.isReducing = false;

            }

            // calling slice makes a snapshot of the current subscribers
            // if one of them tries to unsubscribe it will have no effect for this round of dispatching
            context.subscribers.slice().forEach( function ( subscriber ) {

                // subscribers are called with no arguments
                // they may call store.getState to get the current state
                // The subscribers exection is not try / catched. This should be done 
                // inside the subscriber declaration because there is no way to properly handle errors
                // here. Moreover it could result to undesired behaviour if some suscribers / components end up in
                // intermediary state because of an error but the store kept dispatching actions.
                subscriber();

            } );

            return action;
            
        },
        /**
         * @returns {Object}
         */
        "getState" : function () {
            
            return context.state;
            
        },
        /**
         *
         * @param subscriber {Function}
         * @returns {Function}
         */
        "subscribe": function ( subscriber ) {

            if ( typeof subscriber !== "function" ) throw new TypeError( "store.subscribe : suscriber must be a function, instead was of type : " + typeof subscriber );
            context.subscribers.push( subscriber );
            var isActive = true;

            
            return function () {

                var index;
                if ( isActive ) {

                    // this code is directly taken from the official repo https://github.com/reactjs/redux/blob/bb9fa19cf2a22d0149dcf134e36404a02d93b2b3/src/createStore.js#L60
                    index = context.subscribers.indexOf( subscriber );
                    context.subscribers.splice( index, 1 );
                    isActive = false;

                }

                
            };
            
        }
    };
    
    if ( te === "function" ) return enhancer( store );
    else return store;
    
};