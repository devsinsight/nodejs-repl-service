const rootFolder = "app"

module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            app: {
                files: [{
                    src: [rootFolder + "/\*\*/\*.ts", "!" + rootFolder + "/.baseDir.ts"],
                    dest: "./dist"
                }],
                options: {
                    module: "commonjs",
                    target: "es6",
                    sourceMap: false,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true
                }
            }
        },
        watch: {
            ts: {
                files: [rootFolder + "/\*\*/\*.ts"],
                options: {
                    module: "commonjs",
                    target: "es6",
                    sourceMap: false,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true
                },
                tasks: ["ts"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("default", [
        "ts"
    ]);

};