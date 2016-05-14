"use strict";
var status  = require( "./status" );
var actions = require( "./actions" );

var cssStatus                = {};
cssStatus[ status.PENDING ]  = "";
cssStatus[ status.RESOLVED ] = " blue lighten-2 line-through ";
cssStatus[ status.DELETED ]  = " red accent-2 line-through ";


module.exports = function ( todo ) {


    if ( todo.status === status.EDITING ) {

        return "<li class='collection-item'>" +
            "<div class='row'>" +
            "<div class='col s11'>" +
            "<div class='input-field'>" +
            "<input value='" + todo.text + "' type='text'>" +
            "</div>" +
            "</div>" +
            "<div class='col s1'>" +
            "<i class='material-icons updateTodo' data-id='" + todo.id + "' data-type='" + actions.CANCEL_TODO_UPDATE + "'>replay</i>" +
            "<i class='material-icons updateTodo' data-id='" + todo.id + "' data-type='" + actions.UPDATE_TODO + "'>done</i></div>" +
            "</div>" +
            "</li>";

    } else {

        return "<li class='collection-item " + cssStatus[ todo.status ] + "'>" + todo.text + "" +
            "<i class='material-icons updateTodo' data-type='" + actions.RESOLVE_TODO + "' data-id='" + todo.id + "'>done</i>" +
            "<i class='material-icons updateTodo' data-type='" + actions.DELETE_TODO + "' data-id='" + todo.id + "'>delete</i>" +
            "<i class='material-icons updateTodo' data-type='" + actions.EDIT_TODO + "' data-id='" + todo.id + "'>mode_edit</i>" +
            "</li>";

    }
};