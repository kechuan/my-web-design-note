// var app = require('./app'); //注意 node环境的require并不和CJS的模块引入一致
// var routes = require('./routes') //因依赖获取IP地址引入
// var http = require('http');
// var open = require('open')

import app from './app.js' //注意 node环境的require并不和CJS的模块引入一致
import {getIPAdress, router as routes} from './routes/index.js' //因依赖获取IP地址引入
import http from 'http'
import open from 'open'
var port = process.env.PORT || '8888';

var server = http.createServer(app);
server.listen(port, ()=>{
  console.log(`请输入连接地址:${getIPAdress()}:${port}/file`);
  // open(`http://${routes.getIPAdress()}:${port}/file`)
});