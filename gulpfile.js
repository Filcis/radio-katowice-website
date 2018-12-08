var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    jscs = require('gulp-jscs'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-cssnano'),
    uncss = require('gulp-uncss'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cssimport = require('gulp-cssimport'),
    beautify = require('gulp-beautify'),
    sourcemaps = require('gulp-sourcemaps'),
    critical = require('critical').stream;

/* baseDirs: baseDirs for the project */

var baseDirs = {
    dist:'dist/',
    src:'src/',
    assets: 'dist/assets/'
};

/* routes: object that contains the paths */

var routes = {
    styles: {
        scss: baseDirs.src+'styles/*.scss',
        _scss: baseDirs.src+'styles/_includes/*.scss',
        css: baseDirs.assets+'css/'
    },

    templates: {
    	base: baseDirs.src+'templates/*.pug',
      articles: baseDirs.src+'templates/articles/*.pug',
      onair: baseDirs.src+'templates/radio/*.pug',
      about: baseDirs.src+'templates/o-nas/*.pug',
      music: baseDirs.src+'templates/muzyka/*.pug',
      adverts: baseDirs.src+'templates/reklama/*.pug',
      informations: baseDirs.src+'templates/informacje/*.pug',
      _includes: baseDirs.src+'templates/_includes/*.pug',
    },

    scripts: {
        base:baseDirs.src+'scripts/',
        js: baseDirs.src+'scripts/index.js',
        jsmin: baseDirs.assets+'js/'
    },

    files: {
        html: 'dist/',
        images: baseDirs.src+'images/*',
        imgmin: baseDirs.assets+'files/img/',
        cssFiles: baseDirs.assets+'css/*.css',
        htmlFiles: baseDirs.dist+'**/*.html',
        styleCss: baseDirs.assets+'css/style.css'
    },

    deployDirs: {
        baseDir: baseDirs.dist,
        baseDirFiles: baseDirs.dist+'**/*',
        ftpUploadDir: 'FTP-DIRECTORY'
    }
};

/* Compiling Tasks */

// Templating

gulp.task('templates', function() {
    return gulp.src(
      [
        routes.templates.base,
        routes.templates.articles,
        routes.templates.onair,
        routes.templates.about,
        routes.templates.music,
        routes.templates.adverts,
        routes.templates.informations,
        '!' + routes.templates._includes
    ],{base: baseDirs.src + 'templates'})
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling pug.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(pug({
          pretty: true
        }))
        .pipe(gulp.dest(routes.files.html))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'pug Compiled succesfully!',
            message: 'pug task completed.'
        }));
});

// SCSS

gulp.task('styles', function() {
    return gulp.src(routes.styles.scss)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling SCSS.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
          includePaths: ['./node_modules', './bower_components']
        }))
        .pipe(autoprefixer('last 3 versions'))
        .pipe(sourcemaps.write())
        .pipe(cssimport({}))
        .pipe(gulp.dest(routes.styles.css))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'SCSS Compiled and Minified succesfully!',
            message: 'scss task completed.'
        }));
});



gulp.task('scripts', function() {
    var b = browserify({
        entries: routes.scripts.js,
        debug: true,
    });
    return b.transform("babelify", {presets: ["@babel/preset-env"]})
    .bundle()
    .pipe(plumber({
        errorHandler: notify.onError({
            title: "Error: Compiling SCSS.",
            message:"<%= error.message %>"
        })
    }))
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets/js/'))
    .pipe(browserSync.stream())
    .pipe(notify({
        title: 'JavaScript Minified and Concatenated!',
        message: 'your js files has been minified and concatenated.'
    }));
});

/* Lint, lint the JavaScript files */

gulp.task('lint', function() {
	return gulp.src(routes.scripts.js)
		.pipe(jscs())
		.pipe(jscs.reporter());
});

/* Image compressing task */

gulp.task('images', function() {
    gulp.src(routes.files.images)
        .pipe(imagemin())
        .pipe(gulp.dest(routes.files.imgmin));
});

/* Preproduction beautifiying task (SCSS, JS) */

gulp.task('beautify', function() {
    gulp.src(routes.scripts.js)
        .pipe(beautify({indentSize: 4}))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Beautify failed.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(gulp.dest(routes.scripts.base))
        .pipe(notify({
            title: 'JS Beautified!',
            message: 'beautify task completed.'
        }));
});

/* Serving (browserSync) and watching for changes in files */

gulp.task('serve', function() {
    browserSync.init({
        server: './dist/'
    });

    gulp.watch([routes.styles.scss, routes.styles._scss], ['styles']);
    gulp.watch([routes.templates.base,
      routes.templates.articles,
      routes.templates.onair,
      routes.templates.about,
      routes.templates.music,
      routes.templates.adverts,
      routes.templates.informations,
      routes.templates._includes], ['templates']);
    gulp.watch(routes.scripts.js, ['scripts']);
});

/* Optimize your project */

gulp.task('uncss', function() {
    return gulp.src(routes.files.cssFiles)
        .pipe(uncss({
            html:[routes.files.htmlFiles],
            ignore:['*:*',/carousel.is-4/,/.carousel.is-1/,/.carousel.is-2/,/.is-fixed-top/,/.has-navbar-fixed-top/,/.responsive-yt-embed/,/social-media-icons.*/]
        }))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: UnCSS failed.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest(routes.styles.css))
        .pipe(notify({
            title: 'Project Optimized!',
            message: 'UnCSS completed!'
        }));
});

/* Extract CSS critical-path */

gulp.task('critical', function () {
    return gulp.src(routes.files.htmlFiles)
        .pipe(critical({
            base: baseDirs.dist,
            inline: true,
            html: routes.files.htmlFiles,
            css: routes.files.styleCss,
            ignore: ['@font-face',/url\(/],
            width: 1300,
            height: 900
        }))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Critical failed.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(gulp.dest(baseDirs.dist))
        .pipe(notify({
            title: 'Critical Path completed!',
            message: 'css critical path done!'
        }));
});

gulp.task('dev', ['templates', 'styles', 'scripts', 'images', 'serve']);

gulp.task('build', ['templates', 'styles', 'scripts', 'images']);

gulp.task('optimize', ['uncss', 'critical', 'images']);

gulp.task('deploy', ['optimize',  ]);

gulp.task('default', function() {
    gulp.start('dev');
});
