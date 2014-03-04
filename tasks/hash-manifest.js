module.exports = function( grunt ) {
	"use strict";

	var _ = grunt.util._,
		crypto = require( "crypto" ),
		fs = require( "fs" ),
		path = require( "path" );

	grunt.registerMultiTask( "hash-manifest", "Create list of md5 hashes", function() {
		var format = this.data.options.format || "plain",
			algo = this.data.options.algo || "md5",
			cwd = this.data.options.cwd || "",
			dest = this.data.dest || "manifest-md5." + (format === "json" ? "json" : "txt"),
			absDest = path.resolve( cwd, dest ),
			options = _.extend( {}, this.data.options, { filter: "isFile" } ),
			// Exclude the manifest from the file list in case it's still there from a previous run
			files = _.reject( grunt.file.expand( options, this.data.src ), function( file ) { return file === dest; } ),
			hashes = {},
			content = "";

		// remove dest file before creating it, to make sure itself is not included
		if ( fs.existsSync( absDest ) ) {
			fs.unlinkSync( absDest );
		}

		grunt.log.debug( "Working in '" + cwd + "'" );
		files.forEach( function( file ) {
			var hash = crypto.createHash( algo ),
				absPath = path.resolve( cwd, file );

			grunt.log.debug( "Hashing '" + file + "'" );
			hash.update( grunt.file.read( absPath, { encoding: null }) );
			hashes[ file ] = hash.digest( "hex" );
		});

		if ( format === "json" ) {
			content = JSON.stringify( hashes, null, 4 );
		} else {
			Object.keys(hashes).forEach( function( hash ) {
				content += hash + " " + hashes[ hash ] + "\n";
			});
		}

		grunt.file.write( absDest, content );
		grunt.log.writeln( "Wrote " + absDest + " with " + files.length + " hashes" );
	});
};