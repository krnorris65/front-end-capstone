module.exports = function(grunt) {
    
// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            scripts: {
                files: ["**/scripts/**/*.js", "!node_modules/**/*.js" ],
                tasks: ["eslint", "browserify" ],
                options: {
                    spawn: false,
                },
            }
        },
        eslint: {
            all: ["**/scripts/**/*.js", "!node_modules/**/*.js", "!build/*.js"]
        }
    })

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-watch")

    //Load esLint task
    grunt.loadNpmTasks("grunt-eslint")
    

    // Default task(s).
    grunt.registerTask("default", ["eslint", "watch"])

}