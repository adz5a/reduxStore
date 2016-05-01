"use strict";
var gulp       = require( "gulp" );
var browserify = require( "browserify" );
var source     = require( "vinyl-source-stream" );

gulp.task( "example", function () {
    
    return browserify( "example/tag.js" ).bundle()
        .pipe( source( "tag.js" ) )
        .pipe( gulp.dest( "tag/dist/" ) );
    
} );

gulp.task( "watch-example", [ "example" ], function () {
    
    return gulp.watch( "./example/tag.js", [ "example" ] );
    
} );