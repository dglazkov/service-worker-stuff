module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
      server: {
        options: {
          protocol: "https",
          hostname: "*",
          port: 8888,
          base: "."
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-connect");

  grunt.registerTask("keepalive", function() {
    this.async();
    process.on("SIGINT", function() {
      grunt.log.writeln("").writeln("Shutting down devserver...");
      grunt.task.run(["shell:stopDevserver"]);
      grunt.task.current.async()();
    });
  });

  grunt.registerTask("server", ["connect:server:keepalive"]);
};
