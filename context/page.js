"use strict";
module.exports = function ( global ) {
    
    /*
    * context for fnac
     */
    
    var $        = global.jQuery,
        utils    = global.helpers,
        string   = utils.string,
        location = global.location;
    
    var p = {
        "retailName"  : "fnac",
        "retailPage"  : "",
        "retailSearch": null
    };
    
    var $homeTitle   = $( ".home-title" ).first();
    var $searchTitle = $( ".Search-title" ).first();
    var $breadCrumbs = $( ".Breadcrumb-item" ).find( "span[itemprop='title']" );
    var pageLocation = [];
    
    if ( $searchTitle.length > 0 ) {
        
        //Add dangling underscores to the search terms to ease selection
        p.retailSearch = "_" + string.cleanString( $searchTitle.text().toLowerCase() )
                .split( " " ).join( "_" ) + "_";
        
    }
    
    //on regarde si on se trouve sur une home de catégorie
    if ( location.href.split( "://" )[ 1 ] === "www.fnac.com/" ) {
        
        p.retailPage = "home";
        
    } else if ( $homeTitle.length > 0 ) {
        
        //on assigne comme nom de page le nom de la catégorie
        p.retailPage = string.cleanString( $homeTitle.first().text().toLowerCase() );
        
        
        //on regarde si on se trouve sur une page de type recherche
    } else if ( $breadCrumbs.length > 0 ) {
        
        $breadCrumbs.each( function () {
            
            pageLocation.push( string.cleanString( $( this ).text() ) );
            
        } );
        
        p.retailPage = pageLocation.join( "/" );
        
        //si tout a échoué et qu'on ne sait pas où on se trouve alors on écrit comme page, l'url sur laquelle on se
        // trouve débarassé de sa query si elle est présente pour éviter les effets de bord
    } else {
        
        p.retailPage = decodeURIComponent( location.href.split( "://" )[ 1 ].split( "?" )[ 0 ] );
        
    }
    
    
    return p;
    
};