"use strict";
var actionTypes = require( "./actionTypes.json" );
module.exports  = function ( state, action ) {
    
    switch ( action.type ) {
        
        case actionTypes.UPDATE.SESSION:
            
            return Object.assign( {}, state, action.data );
            
            break;
        
        case actionTypes.UPDATE.PAGE:
            
            return Object.assign( {}, state, action.data );
            
            break;

        case actionTypes.DELIVERY:

            return Object.assign({}, {
                "delivery": action.data
            }, state );

            break;
        
        default:
            
            // if no match, return undefined state
            // All suscribers will apply their defaults on re-rendering
            
            break;
    }
    
};