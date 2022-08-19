var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser')
    ejs = require('ejs')

var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup

//设置模板文件文件夹,__dirname为全局变量,表示网站根目录
// app.set('views', __dirname + '/views');

app.set('views', path.join(__dirname, 'views'));
//将views值设置为:./views 意为模板目录=> ./views
//使得后续


app.set('view engine', 'html');
//注册视图引擎为html
// app.set('view engine', 'ejs');

app.engine('.html', ejs.__express);
//注册ejs模板为html页。简单的讲，就是原来以.ejs为后缀的模板页，现在的后缀名可以//是.html了
//设置视图模板的默认后缀名为.html,避免了每次res.Render("xx.html")的尴尬
//=>将html类型文件以ejs模板引擎进行渲染

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'Icon.ico')));

app.use(logger('dev')); //显示用户访问行为 访问资源目录 状态码 以及延迟 是很好用的监控

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use('/',express.static(path.join(__dirname, 'public'))); 
//设定资源文件载入目录 且预先载入 如果不这样操作的话 express的首页会一直卡请求css 这也是耦合问题之一



app.use('/', routes.router); //接管routes内的路由
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  })

}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
});



exports.app = app