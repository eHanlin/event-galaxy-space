const gulp = require('gulp')
const templateUtil = require('gulp-template-util')
const replace = require('gulp-replace')
const htmlReplace = require('gulp-html-replace')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const imageMin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const cache = require('gulp-cache')
const cleanCss = require('gulp-clean-css')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const del = require('del')
const Q = require('q')

const destination = './dist'

const copyStatic = destination => {
  return gulp
    .src(
      [
        './src/*.html',
        './src/css/**/*.css',
        './src/js/**/*.js',
        './src/img/**/*.@(jpg|png|gif|svg)',
      ], {
        base: './src'
      }
    )
    .pipe(gulp.dest(destination))
}

const clean = source => {
  return del([source])
}

const minifyJs = sourceJS => {
  return gulp
    .src(sourceJS, {
      base: './babel-temp'
    })
    .pipe(
      uglify({
        mangle: true
      }).on('error', console.error)
    )
    .pipe(gulp.dest(destination))
}

const minifyImage = sourceImage => {
  return gulp
    .src(sourceImage, {
      base: './src'
    })
    .pipe(
      cache(
        imageMin({
          use: [pngquant({
            speed: 7
          })]
        }))
    )
    .pipe(gulp.dest(destination))
}

const babelJs = sourceJS => {
  return gulp
    .src(sourceJS, {
      base: './dist'
    })
    .pipe(babel())
    .pipe(gulp.dest('./babel-temp'))
}

const buildJs = () => {
  Q.fcall(templateUtil.logStream.bind(templateUtil.logStream,
    babelJs.bind(babelJs, ['./dist/js/**/*.js', '!./dist/js/lib/*.js'])))
    .then(templateUtil.logStream.bind(templateUtil.logStream, minifyJs.bind(minifyJs, './babel-temp/js/**/*.js')))
    .then(templateUtil.logPromise.bind(templateUtil.logPromise, clean.bind(clean, './babel-temp')))

  return Q.defer().promise
}

/* 合併 CSS */
const concatCss = sourceCss => {
  return gulp.src(sourceCss, {base: './src'})
    .pipe(concat('ehanlin-galaxy-space.css'))
    .pipe(cleanCss())
    .pipe(rename(path => {
      path.basename += '.min'
    }))
    .pipe(
      replace(/..\/(..\/img\/svg)\/([\w-]+.svg)/g, (match, p1, p2) => {
        console.log(`chest domain => ${match} to ${p1}/${p2}`)
        return `${p1}/${p2}`
      })
    )
    .pipe(gulp.dest('./dist/css'))
}

/* 將 index.html include 的所有 CSS 替換為合併後之 CSS */
const replaceCss = () => {
  return gulp.src('./src/index.html', {base: './src'})
    .pipe(htmlReplace({
      'css': './css/ehanlin-galaxy-space.min.css'
    }))
    .pipe(gulp.dest(destination))
}

const buildCss = () => {
  Q.fcall(templateUtil.logPromise.bind(templateUtil.logPromise,
    clean.bind(clean, './dist/css/ehanlin-space-all.min.css')))
    .then(templateUtil.logStream.bind(templateUtil.logStream,
      concatCss.bind(concatCss,
        ['./src/css/galaxy-space/*.css', './src/css/lib/csspin-balls.css', './src/css/lib/sweetalert2.css'])
    ))
    .then(templateUtil.logStream.bind(templateUtil.logStream, replaceCss))
    .then(templateUtil.logPromise.bind(templateUtil.logPromise,
      clean.bind(clean, './dist/css/galaxy-space')))

  return Q.defer().promise
}

const buildDevToEnv = () => {
  return gulp
    .src(['./src/js/galaxy-space/*.js', './src/js/currency-bank/*.js'], {
      base: './'
    })
    .pipe(
      replace(/[`](http:\/\/localhost:8080)\/([\w-/${.?=&}]+)`/g, (match, p1, p2) => {
        let buildEnv = `\`/${p2}\``
        console.log(`chest domain => ${match} to ${buildEnv}`)
        return buildEnv
      })
    )
    .pipe(
      replace(/[`](http:\/\/localhost:9090)\/([\w-/${.?=&}]+)`/g, (match, p1, p2) => {
        let buildEnv = `\`/${p2}\``
        console.log(`currencyBank domain => ${match} to ${buildEnv}`)
        return buildEnv
      })
    )
    .pipe(gulp.dest(''))
}

/* 開發 */
gulp.task('buildEnvToDev', () => {
  return gulp
    .src(['./src/js/galaxy-space/*.js', './src/js/currency-bank/*.js'], {
      base: './'
    })
    .pipe(
      replace(/[`]\/(chest)\/([\w-/${.?=&}]*)`/g, (match, p1, p2) => {
        let dev = `\`http://localhost:8080/${p1}/${p2}\``
        console.log(`chest domain => ${match} to ${dev}`)
        return dev
      })
    )
    .pipe(
      replace(/[`]\/(currencyBank)\/([\w-/${.?=&}]*)`/g, (match, p1, p2) => {
        let dev = `\`http://localhost:9090/${p1}/${p2}\``
        console.log(`currencyBank domain => ${match} to ${dev}`)
        return dev
      })
    )
    .pipe(gulp.dest(''))
})

/* 正式 */
gulp.task('buildDevToEnv', buildDevToEnv)

gulp.task('concatCss', buildCss)
gulp.task('minifyImage', minifyImage.bind(minifyImage, './src/img/**/*.@(jpg|png)'))
gulp.task('minifyJs', minifyJs.bind(minifyJs, './babel-temp/js/**/*.js'))
gulp.task('babelJs',
  babelJs.bind(babelJs, './dist/js/@(galaxy-space|currency-bank|module-utils)/*.js'))

gulp.task('package', () => {
  Q.fcall(templateUtil.logPromise.bind(templateUtil.logPromise, clean.bind(clean, destination)))
    .then(templateUtil.logStream.bind(templateUtil.logStream, buildDevToEnv))
    .then(templateUtil.logStream.bind(templateUtil.logStream, copyStatic.bind(copyStatic, destination)))
    .then(() => {
      return Q.all([
        templateUtil.logStream(minifyImage.bind(minifyImage, './src/img/**/*.png')),
        templateUtil.logPromise(buildCss),
        templateUtil.logPromise(buildJs)
      ])
    })

  return Q.defer().promise
})
