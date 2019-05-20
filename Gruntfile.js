module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      scatter: {
        files: {
          'dist/sealsc-web-extension-scatter.js': [ 'src/extension.js' ]
        },

        options: {
          transform: [["babelify"]],
          browserifyOptions: {
            standalone: 'sealsc-web-extension-scatter'
          }
        }
      },
    },
    uglify: {
      options: {
        sourceMap: true
      },
      scatter: {
        files:{
          'dist/sealsc-web-extension-scatter.min.js': [ 'dist/sealsc-web-extension-scatter.js' ],
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  grunt.registerTask('build', ['browserify', 'uglify']);
};
