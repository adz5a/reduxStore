"use strict";
var tag    = require( "./../tag" );
var global = require( "./../global" );
var __sto  = global.__sto;

tag( function () {
    return {
        "retailPage": "accueil/test",
        "retailName": "testRetailer"
    };
} );

__sto.deliv( {
    "SK": {
        "id": "scriptId",
        "to": "0",
        "ti": "1"
    }
} );

__sto.load( {
    "id"          : "scriptId",
    "dependencies": [
        "template.searchandising"
    ],
    "settings"    : {
        "background-color": "black"
    },
    function ( context, template ) {
        
        
        return template.run();
        
    }
} );

__sto.register( {
    "type"   : "template",
    "name"   : "searchandising",
    "builder": function ( global, context, settings ) {
        
        var $       = global.jQuery;
        var wrapper = $( "<div class='sto-searchandising-wrapper'><div class='sto-searchandising-container' style='background-color: red;'></div></div>" )
            .css( {
                "position": "relative"
            } );

        Object.keys( settings ).forEach( function ( selector ) {

            wrapper.find( selector ).css( settings[ selector ] );

        } );

        return {
            "run": function () {

                wrapper.insertAfter( "#addProductNotifZone" );

            }
        };
    }
} );
