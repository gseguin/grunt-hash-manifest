# grunt-hash-manifest [![Build Status](https://secure.travis-ci.org/gseguin/grunt-hash-manifest.png?branch=master)](http://travis-ci.org/gseguin/grunt-hash-manifest)

Creates manifest of files and associated hashes

## Getting Started
This plugin requires Grunt `~0.4.0`

```shell
npm install grunt-hash-manifest --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hash-manifest');
```

*This plugin was designed to work with Grunt 0.4.x.


### Options
- `algo` specifies which hashing algorithm to use. The default is `md5`. The choices are limited to what node's `crypto` module supports.
- `cwd` is the directory in which to expand the globbing patterns as well as the root for `dest`

### Usage Examples

```js
"hash-manifest": {
  dist: {
    options: {
        algo: "md5",
        cwd: "dist"
    },
    src: [ "**/*" ],
    dest: "MANIFEST"
  }
}
```
