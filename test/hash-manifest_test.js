var fs = require( "fs" );

exports[ "hash-manifest" ] = {
	main: function ( test ) {
		"use strict";

		var actual, expected;

		test.expect( 7 );

		actual = fs.readFileSync( "tmp/manifest-all-md5.txt", "utf8" );
		expected = fs.readFileSync( "test/expected/manifest-all-md5.txt", "utf8" );
		test.equal( expected, actual );

		actual = fs.readFileSync( "tmp/manifest-shallow-md5.txt", "utf8" );
		expected = fs.readFileSync( "test/expected/manifest-shallow-md5.txt", "utf8" );
		test.equal( expected, actual );

		actual = fs.readFileSync( "tmp/manifest-expand-md5.txt", "utf8" );
		expected = fs.readFileSync( "test/expected/manifest-expand-md5.txt", "utf8" );
		test.equal( expected, actual );

		actual = fs.readFileSync( "tmp/manifest-all-sha1.txt", "utf8" );
		expected = fs.readFileSync( "test/expected/manifest-all-sha1.txt", "utf8" );
		test.equal( expected, actual );

		actual = fs.readFileSync( "tmp/manifest-shallow-sha1.txt", "utf8" );
		expected = fs.readFileSync( "test/expected/manifest-shallow-sha1.txt", "utf8" );
		test.equal( expected, actual );

		actual = fs.readFileSync( "tmp/manifest-expand-sha1.txt", "utf8" );
		expected = fs.readFileSync( "test/expected/manifest-expand-sha1.txt", "utf8" );
		test.equal( expected, actual );

		actual = fs.readFileSync( "tmp/manifest-all-md5.json", "utf8" );
		expected = fs.readFileSync( "test/expected/manifest-all-md5-json.txt", "utf8" );
		test.equal( expected, actual );

		test.done();
	}
};