const fs = require('fs')
const gulp = require('gulp')
const postcss = require('gulp-postcss')


function processCSS(gulp, filenames, fn) {

  filenames.forEach((filename) => {

    filename = './c/src/' + filename
    fs.access(filename, (err) => {
      if(err) {
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
});

gulp.task('lint', () => {
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
});

gulp.task('css', ['lint', 'autoprefix']);

gulp.task('default', ['autoprefix']);
