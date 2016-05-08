"use strict";

var notImplemtedYet = function ( name ) {
    return function () {
        throw new Error( name + " : not implemented yet" );
    }
};

module.exports = {
    "createStore"       : require( "./createStore" ),
    "bindActionCreators": notImplemtedYet( "bindActionCreators" ),
    "applyMiddleware"   : notImplemtedYet( "applyMiddleware" ),
    "combineReducers"   : notImplemtedYet( "combineReducers" )
};