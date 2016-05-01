"use strict";
var tag    = require( "./../tag" );
var global = require( "./../global" );
var __sto  = global.__sto;

// bootstrap the tag with the current page context
tag( function () {
    return {
        "retailPage": "accueil/test",
        "retailName": "testRetailer"
    };
} );

// declares that you will load a SK
__sto.deliv( {
    "SK": {
        "id": "scriptId",
        "to": "0",
        "ti": "1"
    }
} );

// effectively load the format through the load interface
__sto.load( {
    "id"          : "scriptId",
    "dependencies": [
        {
            "id"      : "template.searchandising", // declares a dep on templare.searchandising, demands it to be loaded before format is executed
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

// register the module
// if multiple calls are made with teh same ids, they will be ignored
// as the implementation relies on promises resolved with the module object
__sto.register( {
    "type"   : "template",
    "name"   : "searchandising",

    /**
     *
     * @param global - global namespace whatever that means
     * @param context - an event emitter/notifier used to communicate with the rest of the page
     *                  could be used to channel DOM events
     * @param settings - runtime format settings, they will be applied before the format is executed
     * @returns {{run: "run", remove: "remove"}} // exposes two methods
     */
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

        // exposes two methods :
        // run : needs an explicit call on template.run() to effectively launch the module
        // remove : a simple map to $object.remove, used to remove the DOM elements from the document
        // Idea : add a destroy method to remove all possible event listeners / variables to allow for garbage collecting
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
