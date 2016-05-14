"use strict";
var status  = require( "./status" );
var actions = require( "./actions" );

module.exports = function ( todo ) {


    if ( todo.status === status.EDITING ) {
        console.log( "hey" );

        return "<li class='collection-item'><form class='todoUpdateForm' >" +
            "<div class='row'>" +
            "<div class='col s11'>" +
            "<div class='input-field'>" +
            "<input value='" + todo.text + "' type='text'>" +
            "</div>" +
            "</div>" +
            "<div class='col s1'>" +
            "<i class='material-icons' data-id='" + todo.id + "' data-type='" + actions.CANCEL_TODO_UPDATE + "'>replay</i>" +
            "<i class='material-icons' data-id='" + todo.id + "' data-type='" + actions.UPDATE_TODO + "'>done</i></div>" +
            "</div>" +
            "</form></li>";

    } else {

        return "<li class='collection-item " + todo.status + "'>" + todo.text + "" +
            "<i class='material-icons' data-type='" + actions.RESOLVE_TODO + "' data-id='" + todo.id + "'>done</i>" +
            "<i class='material-icons' data-type='" + actions.DELETE_TODO + "' data-id='" + todo.id + "'>delete</i>" +
            "<i class='material-icons' data-type='" + actions.EDIT_TODO + "' data-id='" + todo.id + "'>mode_edit</i>" +
            "</li>";

    }
};