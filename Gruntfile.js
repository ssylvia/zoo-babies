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
      }
    },

    connect: {
      dev: {
        options:{
          base: 'src/'
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
      stylus: {
        files: ['src/app/stylesheets/**/*.styl'],
        tasks: ['stylus:dev']
      }
    }

  });

  // Default task(s).
  grunt.registerTask('default', [
    'connect:dev',
    'watch'
  ]);

};