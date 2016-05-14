"use strict";
var $         = window.jQuery;
var todoStore = require( "./todoStore" );
var $input    = $( "#todoInput" );
var actions = require("./actions");

$input.on( "keydown", function ( e ) {

    if ( e.which === 13 ) {

        var todo = $input.val();
        if ( !todo ) {

            alert( "please give me stuff to do" );

        } else {

            todoStore.dispatch( {
                "type": actions.ADD_TODO,
                "text": todo
            } );
            $input.val( "" );

        }

        return false;

    }



} );


module.exports = $input;
