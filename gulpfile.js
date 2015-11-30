var gulp = require('gulp');
var browserify = require('browserify');
var jadeify = require('jadeify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
//para el uso de CSS
var stylus = require('gulp-stylus');
var concat = require('gulp-concat-css');
var nib = require('nib');
var minify = require('gulp-minify-css');

//livereload stuff

var watchify = require('watchify');
var assign = require('lodash.assign');
var livereload = require('gulp-livereload');

var opts = {
    entries: './lib/babel/app.js', //main file
    transform: [babelify, jadeify]
};

opts = assign({}, watchify.args, opts);


//task buiders
gulp.task('build:js', ['js', 'js:watch']);
gulp.task('build:styles', ['styl', 'styles:watch']);
gulp.task('watchAll', ['styles:watch', 'js:watch']);


gulp.task('js', function() {
    return generateBundle(browserify(opts));
});//puede ser cualquier otro nombre

gulp.task('styl', function() {
    return styl();
});

gulp.task('js:watch', function() {
    var w = watchify(browserify(opts));
    w.on('update', function(file) {
        //logica de rebuild
        console.log('file modifed, rebuilding: ', file);
        var bdle = generateBundle(w).pipe(livereload());
        console.log('rebuild finished');
        return bdle;
    });
    //livereload es un Singleton
    return generateBundle(w).pipe(livereload({ start: true }));
    /*gulp.watch('./lib/babel/*.js', ['js']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type +
                    ', running tasks...');
    });*/
});

gulp.task('styles:livereload', function() {
    return styl().pipe(livereload());
    //gulp.watch('./lib/stylus/**/*.styl', ['styl']).on('change', function(event) {
    //    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    //});
});

gulp.task('styles:watch', function() {
    return gulp.watch(['./lib/stylus/styles.styl','./lib/stylus/**/*.styl'], ['styles:livereload']);
});

function styl() {
    return gulp.src('./lib/stylus/styles.styl') // entry point styl
    .pipe(stylus({ use: nib() })) //inicializando nib como plugging
    .pipe(concat('styles.css'))
    //.pipe(minify())
    .pipe(gulp.dest('./public/css'));
}

function generateBundle(b) {
    return b
     .bundle()
     .pipe(source('app.js')) // archivo destino
     .pipe(buffer())
     //.pipe(uglify())
     .pipe(gulp.dest('./public/js/')); //donde se va a guardar
}
