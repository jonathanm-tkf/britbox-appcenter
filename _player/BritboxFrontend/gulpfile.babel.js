/* eslint-disable */
import plugins from 'gulp-load-plugins';
import yargs from 'yargs';
import browser from 'browser-sync';
import gulp from 'gulp';
import panini from 'panini';
import rimraf from 'rimraf';
import sherpa from 'style-sherpa';
import revDistClean from 'gulp-rev-dist-clean';
import yaml from 'js-yaml';
import fs from 'fs';
import webpackStream from 'webpack-stream';
import webpack2 from 'webpack';
import named from 'vinyl-named';
import cssnano from 'cssnano';
import pixelstorem from 'postcss-pixels-to-rem';
import discardComments from 'postcss-discard-comments';
import jsonEditor from 'gulp-json-editor';
import rename from 'gulp-regex-rename';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';
import spritesmith from 'gulp.spritesmith';
import vueLoaderPlugin from 'vue-loader/lib/plugin';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!yargs.argv.production;

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

const bourbon = require('bourbon').includePaths;

function loadConfig() {
  const ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

gulp.task('copyInProjects', gulp.series(copyInProjects));

gulp.task('server', gulp.series(server, watch));

gulp.task('iconfont', gulp.series(iconfont));
gulp.task('rev-delete', gulp.series(rev_delete));
gulp.task('copy', gulp.series(copy));

gulp.task('images', gulp.series(cleanImages, images));

gulp.task('flags', gulp.series(flags));

gulp.task('sass', gulp.series(cleanCss, sass));

gulp.task('build-js', gulp.series(cleanJs, javascript, javascript_vendor));

gulp.task('javascript_vendor', gulp.series(javascript_vendor));

gulp.task('watch', gulp.series(watch));

gulp.task('rename_hash', gulp.series(rename_hash));

gulp.task('pages', gulp.series(pages));

gulp.task('clean', gulp.series(clean));

// Build the "dist" folder by running all of the below tasks
gulp.task(
  'build',
  gulp.series(
    gulp.series(iconfont, 'sass', css_website),
    gulp.series('build-js', javascript_website),
    gulp.series(flags, 'images', pages, styleGuide),
    gulp.series(copy, copyInProjects)
  )
);

// Build the site, run the server, and watch for file changes
gulp.task('default', gulp.series('build', server, watch));

// Generate icons webfont
function iconfont() {
  return gulp
    .src(PATHS.assetsIcons)
    .pipe(
      $.iconfont({
        fontName: 'iconfont',
        formats: ['ttf', 'eot', 'woff', 'woff2'],
        appendCodepoints: true,
        appendUnicode: false,
        normalize: true,
        fontHeight: 1000,
        centerHorizontally: true
      })
    )
    .on('glyphs', function(glyphs, options) {
      gulp
        .src('src/templates/_icons.scss')
        .pipe(
          $.consolidate('underscore', {
            glyphs: glyphs,
            fontName: options.fontName,
            fontDate: new Date().getTime(),
            fontPath: '../fonts/',
            cssClass: 'icon'
          })
        )
        .pipe(gulp.dest('src/assets/scss/components/partials'));

      gulp
        .src('src/templates/icons.html')
        .pipe(
          $.consolidate('underscore', {
            glyphs: glyphs,
            fontName: options.fontName
          })
        )
        .pipe(gulp.dest('src/partials'));
    })
    .pipe(gulp.dest(PATHS.assetsFonts));
}

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
  rimraf(PATHS.distProject, done);
}

function cleanJs(done) {
  rimraf(`${PATHS.distProject}/js/*.*`, done);
}

function cleanCss(done) {
  rimraf(`${PATHS.distProject}/css/*.*`, done);
}

function cleanImages(done) {
  rimraf(`${PATHS.dist}/assets/img/**/*.*`, done);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
  return gulp.src(PATHS.assets).pipe(gulp.dest(`${PATHS.dist}/assets`));
}

function copyInProjects() {
  return gulp.src(PATHS.assetsDist).pipe(gulp.dest(PATHS.distProject));
}

// Copy page templates into finished HTML files
function pages() {
  return gulp
    .src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(
      panini({
        root: 'src/pages/',
        layouts: 'src/layouts/',
        partials: 'src/partials/',
        data: 'src/data/',
        helpers: 'src/helpers/'
      })
    )
    .pipe(gulp.dest(PATHS.dist));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

// Generate a style guide from the Markdown content and HTML template in styleguide/
function styleGuide(done) {
  sherpa(
    'src/styleguide/index.md',
    {
      output: `${PATHS.dist}/styleguide.html`,
      template: 'src/styleguide/template.html'
    },
    done
  );
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp
    .src('src/assets/scss/*.scss')
    .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
    .pipe(
      $.sass({
        includePaths: PATHS.sass.concat(bourbon)
      }).on('error', $.sass.logError)
    )
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(`${PATHS.dist}/assets/css`))
    .pipe(browser.reload({ stream: true }));
}

function css_website() {
  var plugins = [
    cssnano({ map: { inline: false, colormin: false } }),
    pixelstorem(),
    discardComments({ removeAll: true })
  ];
  return gulp
    .src(PATHS.entriesCss)
    .pipe($.cleanCss({ compatibility: 'ie9' }))
    .pipe($.postcss(plugins))
    .pipe($.rev())
    .pipe($.if(!PRODUCTION, rename(/-*(['\da-f]{10})\.*/, '.')))
    .pipe(gulp.dest(`${PATHS.distProject}/css`))
    .pipe(
      $.rev.manifest(`${PATHS.distProject}/rev-manifest.json`, {
        base: PATHS.distProject,
        merge: true
      })
    )
    .pipe(
      $.if(
        !PRODUCTION,
        jsonEditor(function(manifest) {
          var ret = {};
          Object.keys(manifest).forEach(function(path, orig) {
            ret[path] = path.replace(/-*(['\da-f]{10})\.*/, '$1');
          });

          return ret;
        })
      )
    )
    .pipe(gulp.dest(PATHS.distProject))
    .pipe($.notify('Css Copy'));
}

function rename_hash() {
  const manifest = gulp.src(`${PATHS.dist}/assets/rev-manifest.json`);
  return gulp
    .src(`${PATHS.dist}/**/*.html`)
    .pipe($.revRewrite({ manifest }))
    .pipe(gulp.dest(`${PATHS.dist}`));
}

const webpackConfig = {
  mode: PRODUCTION ? 'production' : 'development',
  module: {
    rules: [
      {
        parser: {
          amd: false
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new vueLoaderPlugin()]
};

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp
    .src(PATHS.entries)
    .pipe(named())
    .pipe($.if(!PRODUCTION, $.sourcemaps.init()))
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe(
      $.babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(
      $.if(
        PRODUCTION,
        $.uglify().on('error', e => {
          console.log(e);
        })
      )
    )
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(`${PATHS.dist}/assets/js`));
}

function rev_delete() {
  return gulp
    .src(`${PATHS.distProject}/js/**/*`, { read: false })
    .pipe(revDistClean(`${PATHS.distProject}/rev-manifest.json`, { force: true }));
}

function javascript_vendor() {
  return gulp
    .src(PATHS.entriesvendor)
    .pipe(named())
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest(`${PATHS.dist}/assets/js`))
    .pipe($.rev())
    .pipe($.if(!PRODUCTION, rename(/-*(['\da-f]{10})\.*/, '.')))
    .pipe(gulp.dest(`${PATHS.distProject}/js`))
    .pipe(
      $.rev.manifest(`${PATHS.distProject}/rev-manifest.json`, {
        base: PATHS.distProject,
        merge: true
      })
    )
    .pipe(
      $.if(
        !PRODUCTION,
        jsonEditor(function(manifest) {
          var ret = {};
          Object.keys(manifest).forEach(function(path, orig) {
            ret[path] = path.replace(/-*(['\da-f]{10})\.*/, '$1');
          });

          return ret;
        })
      )
    )
    .pipe(gulp.dest(PATHS.distProject));
}

function javascript_website() {
  return gulp
    .src(PATHS.entriesJs)
    .pipe(named())
    .pipe($.rev())
    .pipe($.if(!PRODUCTION, rename(/-*(['\da-f]{10})\.*/, '.')))
    .pipe(gulp.dest(`${PATHS.distProject}/js`))
    .pipe(
      $.rev.manifest(`${PATHS.distProject}/rev-manifest.json`, {
        base: PATHS.distProject,
        merge: true
      })
    )
    .pipe(
      $.if(
        !PRODUCTION,
        jsonEditor(function(manifest) {
          var ret = {};
          Object.keys(manifest).forEach(function(path, orig) {
            ret[path] = path.replace(/-*(['\da-f]{10})\.*/, '$1');
          });

          return ret;
        })
      )
    )
    .pipe(gulp.dest(PATHS.distProject))
    .pipe($.notify('Js Copy'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp
    .src('src/assets/img/**/*')
    .pipe(
      $.imagemin({
        progressive: true
      })
    )
    .pipe(gulp.dest(`${PATHS.dist}/assets/img`));
}

function flags() {
  // Generate our spritesheet
  var spriteData = gulp.src('src/assets/img/flags/*.jpg').pipe(
    spritesmith({
      imgName: '../img/flags.png',
      cssName: '_flags.scss',
      cssTemplate: 'src/assets/scss/sprites.scss.handlebars',
      padding: 5,
      algorithm: 'top-down'
    })
  );

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe($.imagemin())
    .pipe(gulp.dest('src/assets/img/'));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css.pipe(gulp.dest('src/assets/scss'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init(
    {
      server: PATHS.dist,
      port: PORT,
      notify: false
    },
    done
  );
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
  gulp
    .watch('src/{layouts,partials}/**/*.html')
    .on('all', gulp.series(resetPages, pages, browser.reload));
  gulp
    .watch('src/data/**/*.{js,json,yml}')
    .on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/helpers/**/*.js').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sass, cleanCss, css_website));
  gulp
    .watch('src/assets/js/**/*.{js,vue}')
    .on('all', gulp.series(javascript, cleanJs, javascript_website, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
  gulp
    .watch('src/assets/icons/*.svg')
    .on(
      'all',
      gulp.series(iconfont, sass, resetPages, pages, rename_hash, styleGuide, browser.reload)
    );
  gulp.watch('src/styleguide/**').on('all', gulp.series(styleGuide, browser.reload));
}
