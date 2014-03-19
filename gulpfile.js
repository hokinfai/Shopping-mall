var gulp = require('gulp');
var htmltidy = require('gulp-htmltidy');
var serverport = 3000;
var fileserverport = 8888;

gulp.task('server',function() {
  app = require('./app');
  server = app.listen(serverport);
  console.log('The expressjs web server starts successfully');
})

gulp.task('close', function() {
  server.close();
  server = {};
  app = {};
})

gulp.task('fileserver',function() {
  var fserver = require('./fileserver');
  fserver(fileserverport);
})

gulp.task('tidyejs', function() {
  console.log('already tidy all the ejs files');
  return gulp.src('./views/*.ejs').pipe(htmltidy({hideComments: true,indent: true})).pipe(gulp.dest('build/'));
                            })

// Rerun the task when a file changes
gulp.task('watch',function() {
gulp.watch('./views/*.ejs', ['tidyejs', 'close', 'server']);
gulp.watch('./controllers/*.js', ['close','server']);
gulp.watch('./proxy/*.js', ['close','server']);
gulp.watch('./routes.js', ['close','server']);
gulp.watch('./models/*.js', ['close','server']);
})

gulp.task('default', [ 'tidyejs', 'fileserver','server', 'watch']);
