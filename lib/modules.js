"use strict";
var deferred = require( "deferred" );
var modules  = {};


module.exports = {
    "register": function ( module ) {
        
        var id = [ module.type, module.name ].join( "." );
        console.log( modules, id );
        if ( !modules[ id ] ) modules[ id ] = deferred();
        modules[ id ].resolve( module.builder || module.factory );
        
        return this;
    },
    "require" : function ( id ) {
        console.log( modules );
        if ( !modules[ id ] ) modules[ id ] = deferred();
        return modules[ id ].promise;
        
    }
};