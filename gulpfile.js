var gulp 				= require('gulp'),
	autoprefixer 	= require('gulp-autoprefixer'),
	browserSync  	= require('browser-sync').create(),
	rename 				= require('gulp-rename'),
	gcmq 					= require('gulp-group-css-media-queries'),
	cleanCSS 			= require('gulp-clean-css'),
	plumber 			= require('gulp-plumber'),
	stylus 				= require('gulp-stylus'),
	uglify 				= require('gulp-uglifyjs');



gulp.task( 'browser-sync', ['stylus'] ,function() {
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
	.pipe(gcmq())
	.pipe(gulp.dest("./_styles/"))
	.pipe(browserSync.stream());
});


gulp.task('watch', function () {
	gulp.watch("./_styles/*.styl", ["stylus"]);
	gulp.watch("./_styles/style.mis.css").on('change', browserSync.reload);
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./_scripts/*.js').on("change", browserSync.reload);

});

gulp.task('default', ['browser-sync', 'watch', 'build']);



gulp.task("build", /*['uglify'],*/ () => {
	return gulp.src("./_styles/style.css")
	// .pipe(gcmq())
	.pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
	.pipe(cleanCSS())
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(gulp.dest('./_styles/'))
});


gulp.task('uglify', function() {
  gulp.src('./_scripts/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(gulp.dest('./_scripts/'))
});

