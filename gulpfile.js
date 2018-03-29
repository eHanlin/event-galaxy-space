const gulp = require('gulp')
const templateUtil = require('gulp-template-util')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const imageMin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const cache = require('gulp-cache')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const del = require('del')
const Q = require('q')
const basePath = {
  base: 'src'
}
const dist = 'dist'

function copyStaticTask (destination) {
  return function () {
    return gulp
      .src(
        [
          'src/*.html',
          'src/js/**/*.js',
          'src/img/**/*.png',
          'src/img/**/*.gif',
          'src/img/**/*.svg',
          'src/css/**/*.css'
        ], {
          base: 'src'
        }
      )
      .pipe(gulp.dest(destination))
  }
}

function clean (source) {
  return function clean () {
    return del([source])
  }
}

function minifyJs (sourceJS) {
  return function minifyJs () {
    return gulp
      .src(sourceJS, {
        base: 'babel-temp'
      })
      .pipe(
        uglify({
          mangle: false
        }).on('error', function (error) {
          console.log(error)
        })
      )
      .pipe(gulp.dest(dist))
  }
}

/* 壓縮圖片 */
function minifyImage (sourceImage) {
  return function minifyImage () {
    return gulp
      .src(sourceImage, basePath)
      .pipe(cache(imageMin({
        use: [pngquant({speed: 7})]
      })))
      .pipe(gulp.dest(dist))
  }
}

function babelJs (sourceJS) {
  return function babelJs () {
    return gulp
      .src(sourceJS, basePath)
      .pipe(babel())
      .pipe(gulp.dest('babel-temp'))
  }
}

function buildJS () {
  let deferred = Q.defer()

  Q.fcall(function () {
    return templateUtil.logStream(babelJs(['dist/js/*.js']))
  })
    .then(function () {
      return templateUtil.logStream(minifyJs('babel-temp/js/**/*.js'))
    })
    .then(function () {
      return templateUtil.logPromise(clean('babel-temp'))
    })

  return deferred.promise
}

function buildDevToEnv () {
  return gulp
    .src(['src/js/galaxy-space/*.js'], {
      base: './'
    })
    .pipe(
      replace(/[`](http:\/\/localhost:8080)\/([\w-/${.}]+)`/g, function (match, p1, p2) {
        let buildEnv = `\`/${p2}\``
        console.log(`chest domain => ${match} to ${buildEnv}`)
        return buildEnv
      })
    )
    .pipe(
      replace(/[`](http:\/\/localhost:9090)\/([\w-/${.}]+)`/g, function (match, p1, p2) {
        let buildEnv = `\`/${p2}\``
        console.log(`currencyBank domain => ${match} to ${buildEnv}`)
        return buildEnv
      })
    )
    .pipe(gulp.dest(''))
}

function buildEnvToDev () {
  return gulp
    .src(['src/js/galaxy-space/*.js'], {
      base: './'
    })
    .pipe(
      replace(/[`]\/(chest)\/([\w-/${.}]+)`/g, function (match, p1, p2) {
        let dev = `\`http://localhost:8080/${p1}/${p2}\``
        console.log(`chest domain => ${match} to ${dev}`)
        return dev
      })
    )
    .pipe(
      replace(/[`]\/(currencyBank)\/([\w-/${.}]+)`/g, function (match, p1, p2) {
        let dev = `\`http://localhost:9090/${p1}/${p2}\``
        console.log(`currencyBank domain => ${match} to ${dev}`)
        return dev
      })
    )
    .pipe(gulp.dest(''))
}

/* 合併 CSS */
function concatCss () {
  return function concatCss () {
    return gulp.src('src/css/*.css', basePath)
      .pipe(concat('ehanlin-space-all.css'))
      .pipe(cleanCSS())
      .pipe(rename(function (path) {
        path.basename += '.min'
      }))
      .pipe(gulp.dest('src/css'))
      .pipe(gulp.dest('dist/css'))
  }
}

gulp.task('concatCss', function () {
  var deferred = Q.defer()
  Q.fcall(function () {
    return templateUtil.logPromise(clean('src/css/ehanlin-space-all.min.css'))
  }).then(function () {
    return templateUtil.logStream(concatCss())
  })

  return deferred.promise
})
gulp.task('minifyImage', minifyImage('src/img/**/*.png'))
gulp.task('buildEnvToDev', buildEnvToDev)
gulp.task('buildDevToEnv', buildDevToEnv)
gulp.task('minifyJs', minifyJs('src/js/**/*.js'))
gulp.task('package', function () {
  var deferred = Q.defer()
  Q.fcall(function () {
    return templateUtil.logPromise(clean(dist))
  }).then(function () {
    return templateUtil.logStream(buildDevToEnv)
  }).then(function () {
    return templateUtil.logStream(copyStaticTask('dist'))
  }).then(function () {
    return Q.all([
      templateUtil.logStream(minifyImage('src/img/**/*.png')),
      templateUtil.logStream(concatCss()),
      templateUtil.logStream(buildJS)
    ])
  })

  return deferred.promise
})
