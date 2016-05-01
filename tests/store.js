var test         = require( "tape" );
var storeFactory = require( "./../store.js" );

test( "Store", function ( t ) {

    var store = storeFactory( function (state, action) {
        
        return state;
        
    } );
    

} );