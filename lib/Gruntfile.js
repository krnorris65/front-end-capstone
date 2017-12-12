module.exports = function(grunt) {
    
// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            scripts: {
                files: ["**/controllers/**/*.js", "**/factories/**/*.js", "!node_modules/**/*.js" ],
                tasks: ["eslint"],
                options: {
                    spawn: false,
                },
            }
        },
        eslint: {
            all: ["**/controllers/**/*.js", "**/factories/**/*.js", "!node_modules/**/*.js"]
        }
    })

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-watch")

    //Load esLint task
    grunt.loadNpmTasks("grunt-eslint")
    

    // Default task(s).
    grunt.registerTask("default", ["eslint", "watch"])

}