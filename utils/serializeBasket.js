"use strict";
/**
 * basket should have the following schema
 *  {
 *      totalValue: number,
 *      items: [
 *          {id: string, name: string, promo: string, quantity: number, price}
 *      ]
 *  }
 *
 *
 * @param basket
 */
var fn = require( "utilities/functions.js" );
var tags = require( "./productSchema.json" );

function reduceItems ( itemArray ) {


    return fn.reduce( itemArray, function ( xmlString, item ) {

        var xmlChunk = "";

        xmlChunk += tags.id[ 0 ] + item.id + tags.id[ 1 ];

        xmlChunk += tags.name[ 0 ] + item.name + tags.name[ 1 ];

        xmlChunk += tags.promo[ 0 ] + ( !!item.promo ? "Y" : "N" ) + tags.promo[ 1 ];

        xmlChunk += tags.qty[ 0 ] + ( typeof item.qty === "number" ? item.qty : -1 ) + tags.qty[ 1 ];

        xmlChunk += tags.price[ 0 ] + (typeof item.price === "number" ? item.price : -1).toFixed( 2 ) + tags.price[ 1 ];

        xmlString += "<li>" + xmlChunk + "</li>";

        return xmlString;
    }, "" );

}

module.exports = function ( basket ) {

    var xmlString = "";

    if ( basket.items && basket.items.length > 0 ) {

        xmlString += "<itms>" + reduceItems( basket.items ) + "</itms>";

    } else {

        xmlString += "<itms></itms>";

    }

    xmlString += "<tv>" + basket.totalValue.toFixed( 2 ) + "</tv>";

    return "<bsk>" + xmlString + "</bsk>";


};