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
			hashes = format === "json" ? {} : [],
			isArray = _.isArray(hashes) ? true : false;

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

			if (!isArray) {
				hashes[file] = hash.digest( "hex" );
			} else {
				hashes.push( file + " " + hash.digest( "hex" ) );
			}
		});

		if (!isArray) {
			grunt.file.write( absDest, JSON.stringify(hashes, null, 4) );
		} else {
			grunt.file.write( absDest, hashes.join( "\n" ) + "\n" );
		}

		grunt.log.writeln( "Wrote " + absDest + " with " + files.length + " hashes" );
	});
};