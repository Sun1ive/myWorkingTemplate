var gulp 			= require('gulp'),
	autoprefixer 	= require('gulp-autoprefixer'),
	browserSync  	= require('browser-sync').create(),
	rename 			= require('gulp-rename'),
	pump 			= require('pump'),
	gcmq 			= require('gulp-group-css-media-queries'),
	cleanCSS 		= require('gulp-clean-css');
	var plumber = require('gulp-plumber');

	var stylus = require('gulp-stylus');



gulp.task( 'browser-sync', ['stylus'],function() {
		browserSync.init({
				server: {
						baseDir: "./"
				},
				notify: false
		});
});

gulp.task('stylus', function () {
	return gulp.src('./_styles/style.styl')
	.pipe(plumber())
    .pipe(stylus())
	// .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(gcmq())
	// .pipe(cleanCSS())
	.pipe(gulp.dest("./_styles/"))
	.pipe(browserSync.stream());
});


gulp.task('watch', function () {
	gulp.watch("./_styles/*.styl", ["stylus"]);
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./_scripts/*.js').on("change", browserSync.reload);

});

gulp.task('default', ['browser-sync', 'watch']);



gulp.task("build", () => {
	return gulp.src("./_styles/style.css")
	.pipe(gcmq())
	.pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
	.pipe(cleanCSS())
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(gulp.dest('./dist/'))
});
