"use strict";

var _          = require( "utilities/helpers/collection.js" );
var collection = require( "utilities/collection.js" );
var metrics    = require( "./../metrics.json" );

var aliases = _.reduce( metrics, function ( map, aliases, metricName ) {
    
    map[ metricName ] = metricName;
    
    return _.reduce( aliases, function ( map, alias ) {
        
        map[ alias ] = metricName;
        return map;
        
    }, map );
    
}, {} );


function Tracker () {
    this._context = collection();
}

Tracker.prototype.sendHit = function ( method, params, basket ) {

    

};

module.exports = function () {
    return new Tracker();
};