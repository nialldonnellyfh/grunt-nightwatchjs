/*
 * grunt-nightwatchjs
 * https://github.com/dmartin/grunt-nightwatchjs
 *
 * Copyright (c) 2014 David Martin
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('nightwatchjs', 'Grunt plugin for http://nightwatchjs.org/', function(task) {
    var done = this.async();

    var args = ['--env=' + task];

    var filter = grunt.option('filter');
    if (filter != null) {
      args = args.concat(['-f', filter]);
    }

    var specificTest = grunt.option('test');

    if(specificTest){
      args = args.concat(['-t', specificTest]);
    }

    var groups = grunt.option('group');

    if(groups){
      args = args.concat(['--group', groups]);
    }

    var tag = grunt.option('tag');

    if(tag){
      args = args.concat(['--tag', tag]);
    }

    console.log("Failed");

    var failedTests = grunt.option('failedTests');

    if(failedTests){
      args = args.concat(['--failedTests', failedTests]);
    }

    grunt.log.writeln('Running nightwatchjs with args:' + util.inspect(args, { depth: null }));
    require('child_process').spawn('nightwatch', args, {
      env: process.env,
      stdio: 'inherit'
    }).on('close', function(code) {
      if (code !== 0 && grunt.option('skipExit')) {
        return done(false);
      }
      return done();
    });
  });

};
