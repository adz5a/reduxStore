"use strict";

var undefined;
var test = require( "tape" );
var storeFactory = require( "./../lib/store.js" );


test( "Store with a fixed state", function ( t ) {

    var expected = {
        "state": "STILL"
    };
    var store = storeFactory( function ( state, action ) {

        return expected;

    } );

    var actions = [
        {
            "type": "YOLO"
        },
        undefined,
        "lol",
        null,
        0
    ];

    actions.forEach( action => {

        t.equal( expected, store.dispatch( action ) );

    } );

    t.end();

} );