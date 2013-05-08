/*
 * grunt-hash-manifest
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Ghislain Seguin
 * Licensed under the MIT license.
 */

module.exports = function ( grunt ) {
	"use strict";

	// Project configuration.
	grunt.initConfig( {
		jshint: {
			all: [
				"Gruntfile.js",
				"tasks/*.js",
				"<%= nodeunit.tests %>"
			],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			test: [ "tmp" ]
		},

		test_vars: {
			match: "folder_one/*"
		},

		// Configuration to be run (and then tested).
		"hash-manifest": {
			"md5-all": {
				options: {
					cwd: "test/fixtures"
				},
				src: [ "**/*" ],
				dest: "../../tmp/manifest-all-md5.txt"
			},
			"md5-shallow": {
				options: {
					cwd: "test/fixtures"
				},
				src: [ "*.*" ],
				dest: "../../tmp/manifest-shallow-md5.txt"
			},
			"md5-expand": {
				options: {
					cwd: "test/fixtures"
				},
				src: [ "<%= test_vars.match%>" ],
				dest: "../../tmp/manifest-expand-md5.txt"
			},
			"sha1-all": {
				options: {
					algo: "sha1",
					cwd: "test/fixtures"
				},
				src: [ "**/*" ],
				dest: "../../tmp/manifest-all-sha1.txt"
			},
			"sha1-shallow": {
				options: {
					algo: "sha1",
					cwd: "test/fixtures"
				},
				src: [ "*.*" ],
				dest: "../../tmp/manifest-shallow-sha1.txt"
			},
			"sha1-expand": {
				options: {
					algo: "sha1",
					cwd: "test/fixtures"
				},
				src: [ "<%= test_vars.match%>" ],
				dest: "../../tmp/manifest-expand-sha1.txt"
			}
		},

		// Unit tests.
		nodeunit: {
			tests: [ "test/*_test.js" ]
		}
	} );

	// Actually load this plugin"s task(s).
	grunt.loadTasks( "tasks" );

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-nodeunit" );

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin"s task(s), then test the result.
	grunt.registerTask( "test", [ "clean", "hash-manifest", "nodeunit" ] );

	// By default, lint and run all tests.
	grunt.registerTask( "default", [ "jshint", "test" ] );
};