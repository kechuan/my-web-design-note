/**
 * Module dependencies.
 启动头文件
 */

var app = require('../app');
var routes = require('../routes')
var http = require('http');
var open = require('open')
var port = process.env.PORT || '3000';

// app.set('port', port);  
//set是来干嘛的？
/*
A:给 name 设置项赋 value 值
app.set(name, value)
其实就是给port设值 [port = 3000]这样子
而且经典写了不知道用来干什么 屏蔽了也完全没事 
*/

var server = http.createServer(app.app);
server.listen(port, ()=>{
  console.log(`请输入连接地址:${routes.getIPAdress()}:${port}/file`);
  // open(`http://${routes.getIPAdress()}:${port}/file`)
});