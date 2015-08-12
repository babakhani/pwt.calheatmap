module.exports = function (grunt) {
    var fileBanner = '/*\n  <%= pkg.name %> - v<%= pkg.version %> \n ' +//
        ' Author: reza babakhani \n ' + //
        'http://babakhani.github.io/PersianWebToolkit/heatchart \n */\n'

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                  banner: fileBanner + '( function () {',
                footer: '}());'
            },
            dist: {
                src: [
                    'src/js/zebra_tooltips.js',
                    'src/js/mousewheel.js',
                    'src/js/constant.js',
                    'src/js/config.js',
                    'src/js/days.js',
                    'src/js/persian-hit-chart.js',
                    'src/js/template.js',
                    'src/js/plugin.js'
                ],
                dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        uglify: {
            options: {
                banner: fileBanner
            },
            build: {
                src: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js',
                dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
        sass: {
            options: {
                //banner: fileBanner,
                sourcemap: 'none'
            },
            dist: {
                files: [
                    {
                        'dist/css/<%= pkg.name %>-<%= pkg.version %>.css': 'src/sass/style.scss'
                    }
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['src/css/<%= pkg.name %>.css'],
                        dest: 'dist/<%= pkg.version %>/css/<%= pkg.name %>-<%= pkg.version %>.css' }
                ]

            }
        },
        cssmin: {
            options: {
                banner: fileBanner
            },
            combine: {
                files: {
                    'dist/css/<%= pkg.name %>-<%= pkg.version %>.min.css': ['src/css/<%= pkg.name %>.css']
                }
            }
        },
        jsdoc: {
            dist: {
                src: 'src/js',
                options: {
                    destination: 'doc/<%= pkg.version %>',
                    configure: 'doc/conf.json',
                    template: 'doc/templates/default'
                }
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: ['src/js'],
                    outdir: 'doc/yui/'
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['concat','uglify']
            },
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass', 'cssmin']
            },
            doc: {
                files: ['src/js/*.js'],
                tasks: ['jsdoc']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-watch');

    if (grunt.option("doc") === true) {
        grunt.registerTask('default', ['jsdoc', 'watch']);
    } else {
        grunt.registerTask('default', ['concat', 'sass', 'cssmin' , 'uglify', 'watch']);
    }

};