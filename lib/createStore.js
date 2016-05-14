module.exports = function createStore ( reducer, initialState, enhancer ) {
    
    "use strict";

    var tr = typeof reducer,
        ti = typeof initialState,
        te = typeof enhancer;
    if ( tr !== "function" ) {
        
        throw  new TypeError( "Store : reducer must be a function" );
        
    }

    if ( ti !== "undefined" && !ti === "object" ) {

        throw new TypeError( "Store : initial state must be an object" );

    }
    
    var context = {
        "state"           : void(0),
        "nextSubscriberId": 0,
        "subscribers"     : Object.create( null ),
        "reducer"         : reducer,
        "isDispatching"   : false
    };

    var store = {
        /**
         *
         * @param action
         */
        "dispatch" : function ( action ) {

            if ( context.isDispatching === true ) {

                throw new Error( "Store : trying to dispatch an action while all previous subscribers have not all been notified" );

            }
            context.state         = context.reducer( context.state, action );
            context.isDispatching = true;
            for ( var subscriberId in context.subscribers ) {

                context.subscribers[ subscriberId ]( context.state );

            }
            context.isDispatching = false;

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
         */
        "subscribe": function ( subscriber ) {

            var id                    = context.nextSubscriberId;
            context.subscribers[ id ] = subscriber;
            context.nextSubscriberId++;

            return function () {

                delete context.subscribers[ id ];

            };

        }
    };

    if ( te === "function" ) return enhancer( store );
    else return store;

};