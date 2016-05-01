
(function ( global, storeFactory ) {
    
    
    if ( typeof module === "object" ) {
    
        /**
         * @type {Function}
         * @returns {Store}
         */
        module.exports = storeFactory;
        
    } else {
    
        /**
         * @type {Function}
         * @returns {Store}
         */
        global.storeFactory = storeFactory;
        
    }
    
    
}( typeof window === "object" ? window : this, function () {
    
    "use strict";
    
    
    /**
     * 
     * @param reducer
     * @constructor
     */
    function Store ( reducer ) {
        
        this._reducer   = reducer;
        this._history   = [];
        this._listeners = Object.create( null );
        this._index     = 0;
        
    }
    
    Store.prototype = {
        /**
         * 
         * @returns {*}
         */
        "getState" : function () {
            
            return this._history[ this._history.length - 1 ];// [-1] === undefined
            
        },
        /**
         * 
         * @param action
         * @returns {Store}
         */
        "dispatch" : function ( action ) {
            
            var listenerIndex,
                listeners = this._listeners;
            this._history.push( this._reducer( this.getState(), action ) );
            for ( listenerIndex in listeners ) {
                
                listeners[ listenerIndex ]( this.getState() );
                
            }
            
            return this;
        },
        /**
         * 
         * @param listener
         * @returns {Function}
         */
        "subscribe": function ( listener ) {
            
            var store             = this;
            var i                 = store._index;
            store._listeners[ i ] = listener;
            return function () {
                
                delete store._listeners[ i ];
                
            };
            
        }
    };
    
    /**
     * @param r
     * @returns {Store}
     */
    return function ( r ) {
        return new Store( r );
    };
}() ));
