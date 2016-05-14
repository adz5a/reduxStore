"use strict";
var actions = require( "./actions" );

module.exports = function ( action, $context ) {

    switch ( action.type ) {


        case actions.UPDATE_TODO:

            return {
                "type": actions.UPDATE_TODO,
                "id"  : action.id,
                "text": $context.find( "input" ).val()
            };


            break;


        default:

            return action;

            break;

    }


};