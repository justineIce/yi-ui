const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default', gulp.series((done) => {
    gulp.src('../src/styles/index.scss')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(rename('yiview.css'))
        .pipe(gulp.dest('../lib/styles'));
    done();
}));
