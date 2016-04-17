"use strict";


module.exports = function ( document, src ) {

    var s     = document.createElement( "SCRIPT" );
    s.src     = src;
    s.type    = "text/javascript";
    s.charset = "utf-8";

    document.getElementsByTagName( "HEAD" )[ 0 ].appendChild( s );

    return s;

};