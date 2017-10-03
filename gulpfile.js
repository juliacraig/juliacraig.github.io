const $ = require('gulp-load-plugins')()
const concat = require('gulp-concat')
const del = require('del')
const fs = require('fs')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const standard = require('gulp-standard')

/* CSS
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

function processCSS (gulp, filenames, fn) {
  filenames.forEach((filename) => {
    filename = 'c/src/' + filename
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

/* JS
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

gulp.task('jslint', function () {
  return gulp.src(['gulpfile.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('jsclean', function () {
  return del([
    'j/dst/**/*'
  ])
})

gulp.task('jscopy', function () {
  return gulp.src([
    'node_modules/picturefill/dist/picturefill.js'
  ])
  .pipe(concat('script.js'))
  .pipe(gulp.dest('j/dst/'))
})

/* IMAGES
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

gulp.task('img', function () {
  return gulp.src('i/src/*.{jpg,png}')
    .pipe($.responsive({
      // Convert all images to JPEG format
      '*': [{
        // image-sm.jpg is 480 pixels wide
        width: 480,
        rename: {
          suffix: '-sm',
          extname: '.jpg'
        }
      }, {
        // image-md.jpg is 960 pixels wide
        width: 960,
        rename: {
          suffix: '-md',
          extname: '.jpg'
        }
      }, {
        // image-lg.jpg is 1920 pixels wide
        width: 1920,
        rename: {
          suffix: '-lg',
          extname: '.jpg'
        }
      }]
    }))
    .pipe(gulp.dest('i/dst'))
})

/* TASKS
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

gulp.task('css', ['csslint', 'autoprefix'])

gulp.task('lint', ['csslint', 'jslint'])

gulp.task('js', ['jslint', 'jsclean', 'jscopy'])

gulp.task('all', ['csslint', 'autoprefix', 'jslint', 'img'])

gulp.task('default', ['autoprefix', 'img', 'js'])
