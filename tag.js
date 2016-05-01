"use strict";
var actionTypes = require( "./actionTypes.json" );
var session     = require( "./context/session" );
var store       = require( "./store.js" )( require( "./flow" ) );
var global      = require( "./global" );
var helpers     = require( "utilities/helpers" );
var namespace   = {
    "utils": helpers
};
var methods     = {
    "deliv": function ( deliveryObject ) {
        
        store.dispatch( {
            "type": actionTypes.DELIVERY,
            "data": deliveryObject
        } );
        
    },
    "load" : function ( name, settings, builder ) {
        
        store.dispatch( {
            "type": actionTypes.DELIVERY,
            "data": deliveryObject
        } );
        
    }
};

var masterTag = store.subscribe( function ( state ) {
    
    console.log( JSON.stringify( state, null, 4 ) );
    
} );

global.__sto = Object.assign( {}, namespace, methods );

module.exports = function ( context ) {
    
    store.dispatch( {
        "type": actionTypes.UPDATE.SESSION,
        "data": session()
    } );
    
    store.dispatch( {
        "type": actionTypes.UPDATE.PAGE,
        "data": context()
    } );
    
};