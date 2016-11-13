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
            },
            nano: {
                options: {
                    map: false,
                    processors: [
                        require('cssnano')
                    ]
                },
                src: 'css/crp.css'
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
        },
        penthouse: {
            crp: {
                outfile: './css/crp.css',
                css: './css/main.css',
                url: 'http://localhost',
                width: 820,
                height: 900,
                skipErrors: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-penthouse');

    grunt.registerTask('default', []);
    grunt.registerTask('minifiyImg', ['newer:imagemin:dynamic']);
    grunt.registerTask('crp', ['penthouse:crp', 'postcss:nano']);

    grunt.registerTask('compile', ['pug:src', 'sass:src', 'postcss:src', 'minifiyImg']);
    grunt.registerTask('dev', ['watch:src']);
    grunt.registerTask('ship', ['compile', 'crp']);

};
