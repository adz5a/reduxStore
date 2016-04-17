"use strict";
var metrics = require( "./metrics.json" );
var fn      = require( "utilities/functions.js" );

var metricsAliases = fn.reduce( metrics, function ( aliases, metric ) {

    aliases[ metric[ 0 ] ] = metric[ 1 ];
    return aliases;

}, {} );

module.exports = function ( contextObject ) {

    return fn.reduce( contextObject, function ( contextString, metricValue, metric ) {

        if ( metricsAliases[ metric ] && metricValue && metricValue !== null ) {

            contextString.push( metricsAliases[ metric ] + "=" + (typeof metricValue === "boolean" ? metricValue ? "1" : "0" : metricValue) );

        }
        return contextString;
    }, [] ).join( "&" );

};