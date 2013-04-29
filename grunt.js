module.exports = function(grunt) {
  var fs = require('fs');

  // "___comment___":"You might be wondering what a reasonable maxcomplexity value is for your project. In the 2nd edition of Steve McConnell's Code Complete he recommends that a cyclomatic complexity from 0 to 5 is typically fine, but you should be aware if the complexity starts to get in the 6 to 10 range. He further explains that anything over a complexity of 10 you should strongly consider refactoring your code.",
  var jshintFile = fs.readFileSync(__dirname + '/.jshintrc').toString('utf8');

  var jshintConf = JSON.parse(jshintFile);
  jshintConf = Object.keys(jshintConf).reduce(function(m, key){
    if(key === "predef"){
      m.globals = jshintConf[key].reduce(function(m, k){m[k] = true; return m;}, {});
    } else {
      m.options[key] = jshintConf[key];
    }

    return m;
  }, {options:{}, globals:{}});

  // Project configuration.
  var gruntConfig = {
    lint: {
      all: ['*.js','test/*.js']
    },

    jshint: jshintConf,

    watch: {

      test:{
        files: ['<config:lint.all>'],
        tasks: 'lint test'
      }
    },

    test: {
      all: ['test/*.js']
    }
  };

  grunt.initConfig(gruntConfig);
};
