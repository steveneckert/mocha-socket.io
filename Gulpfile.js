var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('lint', function() {
    return gulp.src('./lib/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['lint'], function() {
    return gulp.src('./test/**/*.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'nyan'
        }));
});


gulp.task('default', ['lint', 'test'], function() {
    // place code for your default task here
    gulp.watch(['./lib/**/*.js', './test/**/*.js'], ['test']);
});
