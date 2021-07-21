const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cssnano = require ('gulp-cssnano'),
	autoprefixer = require ('gulp-autoprefixer'), 
	imagemin = require ('gulp-imagemin'),
	concat = require ('gulp-concat'),
	uglify = require ('gulp-uglify'),
	rename = require ('gulp-rename');


gulp.task ( 'html', function (done) {
    return gulp.src ( 'src/*.html')
    .pipe (gulp.dest ( 'dist'));
	done()
});

gulp.task('fonts', function(done) {
   return gulp.src('#src/fonts/**/*')
   .pipe(gulp.dest('dist/fonts'));
});

gulp.task ( 'sass', function (done) {
    return gulp.src ( '#src/sass/*.sass')
        .pipe (concat ( 'styles.sass'))
        .pipe (sass ())
        .pipe (gulp.dest ( '#src/css'))
        .pipe(browserSync.reload({
      	stream: true
    	}))
        .pipe (autoprefixer ({
            browsers: [ 'last 2 versions'],
            cascade: false
        }))
        .pipe (cssnano ())
        .pipe (rename ({suffix: '.min'}));
	done()
});

gulp.task ( 'script', function (done) {
    return gulp.src ( '#src/js/*.js')
        .pipe (concat ( 'script.js'))
        .pipe (uglify ())
        .pipe (rename ({suffix: '.min'}))
        .pipe (gulp.dest ( 'dist/js'));
	done()
});

gulp.task ( 'imgs', function (done) {
    return gulp.src ( '#src/images/*.+(jpg|jpeg|png|gif)')
        .pipe (imagemin ({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe (gulp.dest ( "dist/images"))
	done()
});

gulp.task ('watch', function(){
	browserSync.init({
        watch: true,
		server: {
			baseDir: '#src'
    	},
  	});
    gulp.watch('#src/*.html').on('change', browserSync.reload);
    gulp.watch('#src/js/*.js').on('change', browserSync.reload);
    gulp.watch('#src/fonts/*').on('change', browserSync.reload);
    gulp.watch('#src/sass/*.sass', gulp.series('sass'));
    gulp.watch('#src/images/*.+(jpg|jpeg|png|gif)').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('watch'));