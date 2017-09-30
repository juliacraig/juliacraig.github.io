const fs = require('fs')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const standard = require('gulp-standard')

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

gulp.task('css', ['csslint', 'autoprefix'])

gulp.task('lint', ['csslint', 'jslint'])

gulp.task('all', ['csslint', 'autoprefix', 'jslint'])

gulp.task('default', ['autoprefix'])
