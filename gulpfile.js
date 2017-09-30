const fs = require('fs')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const standard = require('gulp-standard')
const $ = require('gulp-load-plugins')();

function processCSS (gulp, filenames, fn) {
  filenames.forEach((filename) => {
    filename = './c/src/' + filename
    fs.access(filename, (err) => {
      if (err) {
        throw new ReferenceError('Can\'t find file: "' + filename + '"')
      }
    })

    fn(gulp, filename)
  })
}

const srcCSSfiles = ['portfolio.css', 'style.css']

gulp.task('autoprefix', () => {
  processCSS(gulp, srcCSSfiles, (gulp, filename) => {
    gulp.src(filename)
      .pipe(postcss([
        require('autoprefixer')({ browsers: ['> 1%'] })
      ]))
      .pipe(gulp.dest('c/dst'))
  })
})

gulp.task('csslint', () => {
  processCSS(gulp, srcCSSfiles, (gulp, filename) => {
    gulp.src(filename)
      .pipe(
        postcss([
          require('stylelint')({configFile: '.stylelintrc'}),
          require('postcss-reporter')(
            { clearReportedMessages: true }
          )
        ]))
  })
})

gulp.task('jslint', function () {
  return gulp.src(['./gulpfile.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('img', function () {
  return gulp.src('i/src/*.{jpg,png}')
    .pipe($.responsive({
      // Convert all images to JPEG format
      '*': [{
        // image-sm.jpg is 480 pixels wide
        width: 480,
        rename: {
          suffix: '-sm',
          extname: '.jpg',
        },
      }, {
        // image-md.jpg is 768 pixels wide
        width: 768,
        rename: {
          suffix: '-md',
          extname: '.jpg',
        },
      }, {
        // image-lg.jpg is 768 pixels wide
        width: 1240,
        rename: {
          suffix: '-lg',
          extname: '.jpg',
        },
      }],
    }))
    .pipe(gulp.dest('i/dst'));
});

gulp.task('css', ['csslint', 'autoprefix'])

gulp.task('lint', ['csslint', 'jslint'])

gulp.task('all', ['csslint', 'autoprefix', 'jslint', 'img'])

gulp.task('default', ['autoprefix', 'img'])
