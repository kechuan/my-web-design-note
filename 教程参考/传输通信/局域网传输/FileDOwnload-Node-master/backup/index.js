var app = require('./app'); //注意 node环境的require并不和CJS的模块引入一致
var routes = require('./routes') //因依赖获取IP地址引入
var http = require('http');
var open = require('open')


var port = process.env.PORT || '8888';

var server = http.createServer(app.app);
server.listen(port, ()=>{
  console.log(`请输入连接地址:${routes.getIPAdress()}:${port}/file`);
  // open(`http://${routes.getIPAdress()}:${port}/file`)
});