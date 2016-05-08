"use strict";

var undefined;
var test = require( "tape" );
var storeFactory = require( "./../lib/createStore.js" );


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

test( "Store throws when trying to nest dispatch actions", function ( t ) {

    var store = storeFactory( function () {
    } );
    var wasCalled = false;

    t.throws( function () {

        store.subscribe( function ( state ) {

            wasCalled = true;
            store.dispatch( {} );

        } );

        store.dispatch( {} );

    } );

    t.equal( wasCalled, true );

    t.end();

} );

test( "Subscriber can be removed", function ( t ) {

    var store = storeFactory( function () {

    } );
    var count = 0;
    var unsubscribe = store.subscribe( function ( state ) {

        count++;

    } );

    store.dispatch( {} );

    t.equal( count, 1, "callback was called the first time" );

    unsubscribe();

    store.dispatch( {} );

    t.equal( count, 1, "callback was not called the second time" );

    t.end();
} );