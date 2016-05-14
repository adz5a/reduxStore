"use strict";

var test        = require( "tape" ),
    createStore = require( "./../lib/createStore" );

test( "store.subscribe", function ( t ) {

    var store = createStore( ( state, action ) => {

        return state;

    }, {} );

    var unsubscribe1 = store.subscribe( state => {
    } );

    store.subscribe( state => {



    } );

    t.end();
} );

test( "store.dispatch", function ( t ) {

    var state  = {};
    var action = {};
    var store  = createStore( ( state, action ) => {
        return state;
    }, state );

    t.true( state === store.getState(), "The state should be the initial state" );
    t.true( action === store.dispatch( action ), "The action returned by store.dispatch should be equal to the one sent in" );
    t.true( state === store.getState(), "The state should remain the same" );

    t.end();

} );
