module.exports = function(grunt) {
    grunt.initConfig({
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }),
                    require('cssnano')
                ]
            },
            src: {
                src: 'css/*.css'
            }
        },
        sass: {
            options: {
                style: "expanded",
                sourcemap: "none"
            },
            src: {
                files: {
                    'css/main.css': 'src/main.scss'
                }
            }
        },
        pug: {
            src: {
                files: {
                    'index.html': ['src/index.pug']
                },
                options: {
                    pretty: true
                }
            }
        },
        watch: {
            src: {
                files: ['src/**/*.scss', 'src/**/*.pug'],
                tasks: ['compile']
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'img/src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/dist/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('default', []);
    grunt.registerTask('minifiyImg', ['newer:imagemin:dynamic']);
    grunt.registerTask('compile', ['pug:src', 'sass:src', 'postcss:src', 'minifiyImg']);
    grunt.registerTask('dev', ['watch:src']);

};
