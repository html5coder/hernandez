var gulp = require('gulp'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith  = require('gulp.spritesmith'),
    sass = require('gulp-sass');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// LiveReload
gulp.task('connect', function () {
  connect.server({
    root: ['build'],
    port: '8000',
    livereload: true
  });
});

// Markup
gulp.task('html', function() {
  gulp.src('src/*.html')
    // File includes
    // .pipe(include())
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

// Styles
gulp.task('sass', function () {
  gulp.src('src/sass/*.{sass,scss}')
    .pipe(sass())
    .on('error', console.log)
    .pipe(autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS,
      cascade: false
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
});

// Sprites
gulp.task('sprite', function() {
  var spriteData =
    gulp.src('src/img/icons/*.png')
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.sass',
        cssFormat: 'sass',
        algorithm: 'binary-tree',
        padding: 5,
        cssTemplate: 'sass.template.mustache',
        cssVarMap: function(sprite) {
          sprite.name = 's-' + sprite.name
        }
      }));
  spriteData.img.pipe(gulp.dest('build/img'));
  spriteData.css.pipe(gulp.dest('src/sass'));
});

// Images
gulp.task('img', function () {
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('build/img'))
    .pipe(connect.reload());
});

// Scripts
gulp.task('js', function () {
  gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(connect.reload());
});

// Fonts
gulp.task('fonts', function () {
  gulp.src('src/fonts/**')
    .pipe(gulp.dest('build/fonts'))
    .pipe(connect.reload());
});

// Watch tasks
gulp.task('watch', function () {
  gulp.watch('src/**.html', ['html']);
  gulp.watch('src/sass/**/*.{sass,scss}', ['sass']);
  gulp.watch('src/img/*', ['img']);
  gulp.watch('src/img/icons/*.png', ['sprite']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/fonts/*', ['fonts']);
});

// Default tasks
gulp.task('default', [ 'sprite', 'html', 'sass', 'img', 'js', 'fonts', 'connect', 'watch']);