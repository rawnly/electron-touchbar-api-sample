'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import browserify from 'gulp-browserify';
import prefix from 'gulp-autoprefixer';
import babel from 'gulp-babel';

import files from './GulpConfig';


gulp.task('default', ['build', 'sass', 'watch']);
gulp.task('build', ['main', 'static', 'render', 'sass', 'libs']);

gulp.task('watch', () => {
	gulp.watch(files.js.source ['render']);
	gulp.watch(files.main.source, ['app']);
	gulp.watch(files.libs.source, ['libs']);
	gulp.watch(files.sass.source, ['sass']);
});

gulp.task('sass', () => {
	return gulp.src(files.sass.source)
		.pipe(sass())
		.pipe(prefix())
		.pipe(gulp.dest(files.sass.dest));
});

gulp.task('render', () => {
	return gulp.src(files.js.source)
		// .pipe(browserify({
		// 	insertGlobals: true,
		// 	debug: true,
		// 	transform: ['babelify']
		// }))
		.pipe(gulp.dest(files.js.dest));
});

gulp.task('main', () => {
	return gulp.src(files.main.source)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(files.main.dest));
});

gulp.task('libs', () => {
	return gulp.src(files.libs.source)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(files.libs.dest));
});

gulp.task('static', () => {
	return gulp.src(files.html.source)
		.pipe(gulp.dest(files.html.dest));
});