"use strict";

var global = typeof global === "object" && global.document && global.window ? global : window;
var document = global.document;
var endPoint = "//tk.storetail.io/fo?";


module.exports = function ( queryString, basket ) {
    var randomId = (new Date()).getTime();
    var form = "<form target='" + randomId + "' action='" + endPoint + (queryString || "") + "' method='post' style='display: none;'><input name='bk' value='" + basket + "'></form>";
    var iframe = "<iframe id='" + randomId + "' name='" + randomId + "' style='display: none;'></iframe>";

    var container = document.createElement( "DIV" );
    container.innerHTML = form + iframe;
    document.getElementsByTagName( "body" )[ 0 ].appendChild( container );
    container.firstChild.submit();

};