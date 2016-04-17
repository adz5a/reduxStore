"use strict";

var document = window.document;

module.exports = function ( string ) {

    var s = document.createElement( "SCRIPT" );
    s.src = "//tk.storetail.io/js?" + string;
    document.getElementsByTagName( "head" )[ 0 ].appendChild( s );
    return s;

};