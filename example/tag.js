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
        {
            "id"      : "template.searchandising",
            "settings": {
                ".sto-searchandising-container": {
                    "background-color": "blue"
                }
            }
        }
    ],
    "options"     : {},
    "main"        : function ( context, template ) {
        
        console.log( "I'im loading yo" );
        return template.run();
        
    }
} );

__sto.register( {
    "type"   : "template",
    "name"   : "searchandising",
    "builder": function ( global, context, settings ) {
        
        console.log( "hello man" );
        var $       = global.jQuery;
        var wrapper = $( "<div class='sto-searchandising-wrapper'><div class='sto-searchandising-container'></div></div>" )
            .css( {
                "position": "relative"
            } );
        
        //set defaults
        var defaults = {
            ".sto-searchandising-container": {
                "height"          : "200px",
                "background-color": "red"
            }
        };
        Object.keys( defaults ).forEach( function ( selector ) {
            
            wrapper.find( selector ).css( defaults[ selector ] );
            
        } );
        
        Object.keys( settings ).forEach( function ( selector ) {
            
            wrapper.find( selector ).css( settings[ selector ] );
            
        } );
        
        return {
            "run"   : function () {
                
                wrapper.appendTo( "#addProductNotifZone" );
                return this;
                
            },
            "remove": function () {
                
                wrapper.remove();
                return this;
                
            }
        };
    }
} );
