module.exports = function(grunt) {
    
// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            scripts: {
                files: ["../app/**/controllers/**/*.js", "../app/**/factories/**/*.js", "!./node_modules/**/*.js" ],
                tasks: ["eslint"],
                options: {
                    spawn: false,
                  }
            }
        },
        eslint: {
            all: ["../app/**/controllers/**/*.js", "../app/**/factories/**/*.js", "!node_modules/**/*.js"]
        }
    })

    
    grunt.loadNpmTasks("grunt-contrib-watch")
    grunt.loadNpmTasks("grunt-eslint")
    // grunt.loadNpmTasks("grunt-contrib-sass")
    

    // Default task(s).
    grunt.registerTask("default", ["eslint", "watch"])

}