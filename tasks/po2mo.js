/*
 * grunt-po2mo
 * https://github.com/MicheleBertoli/grunt-po2mo
 *
 * Copyright (c) 2013 Michele Bertoli
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('po2mo', 'Compile .po files into binary .mo files with msgfmt.', function() {

    var options = this.options({
      removeFiles: false,
    });

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(file) {

      var dest = file.dest;
      if (dest.indexOf('.po') > -1) {
          dest = dest.replace('.po', '.mo');
      }
      grunt.file.write(dest);

      grunt.verbose.writeln('Writing ' + dest.toString().cyan);
      
      var exec = require('child_process').exec;
      var command = 'msgfmt -o ' + dest + ' ' + file.src[0];

      grunt.verbose.writeln('Executing: ' + command);
      exec(command);

      if (options.removeFiles) {
        grunt.file.delete(file.dest);  
        grunt.verbose.writeln('Deleting ' + file.dest.toString().red);
      }      

      grunt.verbose.writeln();
    });
    var string = "Created "+this.files.length+ ' ".mo" files';
    if (options.removeFiles) {
      string += " and deleted "+this.files.length+' ".po" files.';
    }   
    grunt.log.writeln();
    grunt.log.writeln(string.toString().green);

  });

};
