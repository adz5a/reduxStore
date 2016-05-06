"use strict";
var gulp = require( "gulp" );
var browserify = require( "browserify" );
var source = require( "vinyl-source-stream" );
var watch = require( "gulp-watch" );

gulp.task( "example", function () {

    return browserify( "example/example.js" ).bundle()
        .pipe( source( "tag.js" ) )
        .pipe( gulp.dest( "example/dist/" ) );

} );

gulp.task( "watch-example", [ "example" ], function () {

    return gulp.watch( "./example/example.js", [ "example" ] );

} );