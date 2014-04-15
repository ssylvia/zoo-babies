module.exports = function(grunt) {

  // Add loader for Grunt plugins
  require("matchdep").filterDev(["grunt-*","assemble"]).forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      dev: {
        options: {
          layoutdir: 'src/app/templates/layouts',
          layoutext: '.hbs',
          data: ['data/**/*.{json,yml}'],
          postprocess: require('pretty'),
          production: false
        },
        expand: true,
        flatten: true,
        src: ['src/app/pages/**/*.hbs'],
        dest: 'src/'
      },
      build: {
        options: {
          layoutdir: 'src/app/templates/layouts',
          layoutext: '.hbs',
          data: ['data/**/*.{json,yml}'],
          postprocess: require('pretty'),
          production: true
        },
        expand: true,
        flatten: true,
        src: ['src/app/pages/**/*.hbs'],
        dest: 'deploy/'
      }
    },

    clean: {
      prepBuild: ['deploy/'],
      buildTools: ['deploy/resources/buildTools']
    },

    connect: {
      dev: {
        options:{
          base: 'src/'
        }
      }
    },

    copy: {
      buildResources: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['resources/**'],
          dest: 'deploy/'
        }]
      },
      resourcesUtitls: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'src/',
          src: ['bower_components/zeroclipboard/ZeroClipboard.swf'],
          dest: 'src/resources/utils/'
        }]
      }
    },

    jshint: {
      files: ['src/app/javascript/**/*.js'],
      options: {jshintrc: '.jshintrc'}
    },

    requirejs: {
      app: {
        options: {
          baseUrl: 'src',
          paths: {
            'dojo': 'empty:',
            'dijit': 'empty:',
            'dojox': 'empty:',
            'esri': 'empty:',
            'storymaps': 'app/javascript',
            'jquery': 'bower_components/jquery/dist',
            'lib': 'bower_components'
          },
          name: 'resources/buildTools/requirejs/config',
          out: 'deploy/app/javascript/app.min.js'
        }
      }
    },

    stylus: {
      dev: {
        options: {
          compress: false,
          linenos: true,
          paths: ['src/app/stylesheets','src/bower_components/','src/resources/fonts/'],
          use: [
            require('nib')
          ],
          'include css': true,
        },
        files: {
          'src/app/stylesheets/app.css': 'src/app/stylesheets/app.styl'
        }
      },
      build: {
        options: {
          compress: false,
          linenos: true,
          paths: ['src/app/stylesheets','src/bower_components/','src/resources/fonts/'],
          use: [
            require('nib')
          ],
          'include css': true,
        },
        files: {
          'deploy/app/stylesheets/app.css': 'src/app/stylesheets/app.styl'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      assemble: {
        files: ['src/app/pages/**/*.hbs','src/app/templates/layouts/**/*.hbs','data/**/*.{json,yml}'],
        tasks: ['assemble:dev'],
      },
      jshint: {
        files: ['src/app/javascript/**/*.js'],
        tasks: ['jshint']
      },
      stylus: {
        files: ['src/app/stylesheets/**/*.styl'],
        tasks: ['stylus:dev']
      }
    }

  });

  // Default task(s).

  grunt.registerTask('default', [
    'copy:resourcesUtitls',
    'assemble:dev',
    'stylus:dev',
    'connect:dev',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:prepBuild',
    'jshint',
    'copy:resourcesUtitls',
    'copy:buildResources',
    'assemble:build',
    'stylus:build',
    'requirejs',
    'clean:buildTools'
  ]);

};