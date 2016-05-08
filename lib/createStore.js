module.exports = function createStore ( reducer ) {
    
    "use strict";
    
    if ( typeof reducer !== "function" ) {
        
        throw  new TypeError( "Store : reducer must be a function" );
        
    }
    
    var context = {
        "state"           : void(0),
        "nextSubscriberId": 0,
        "subscribers"     : Object.create( null ),
        "reducer"         : reducer,
        "isDispatching"   : false
    };
    
    return {
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
            
            return this.getState();
            
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
};