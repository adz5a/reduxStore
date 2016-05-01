"use strict";
var deferred    = require( "deferred" );
var actionTypes = require( "./actionTypes.json" );
var session     = require( "./context/session" );
var store       = require( "./store" )( require( "./flow" ) );
var global      = require( "./global" );
var modules     = require( "./modules" );
var namespace   = {
    "jQuery": global.jQuery
};
var methods     = {
    "deliv"   : function ( deliveryObject ) {
        
        store.dispatch( {
            "type": actionTypes.DELIVERY,
            "data": deliveryObject
        } );
        
    },
    "load"    : function ( format ) {
        
        var deps = format.dependencies.map( function ( dependency ) {
            console.log( dependency.id );
            return modules.require( dependency.id ).then( function ( dep ) {
                return dep( global, {}, dependency.settings ); //global (sandbox), context (eventEmitter), settings
            } ).catch( err => console.log( err ) );
        } );
        
        deferred.all( deps ).then( function ( dependencies ) {
            
            return format.main.apply( void(0), [ {} ].concat( dependencies ) );
            
        } )
        
        
    },
    "register": function ( module ) {
        
        modules.register( module );
        return this;
        
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