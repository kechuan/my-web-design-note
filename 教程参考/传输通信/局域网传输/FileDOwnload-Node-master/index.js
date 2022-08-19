var app = require('./app');
var routes = require('./routes') //因依赖获取IP地址引入
var http = require('http');
var open = require('open')
var port = process.env.PORT || '8888';

var server = http.createServer(app.app);
server.listen(port, ()=>{
  console.log(`请输入连接地址:${routes.getIPAdress()}:${port}/file`);
  // open(`http://${routes.getIPAdress()}:${port}/file`)
});