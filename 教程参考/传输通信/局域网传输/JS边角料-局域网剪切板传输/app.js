//导入express框架
var express = require("express");
var app = express();
//解决跨域问题
const cors = require('cors');
// 中间件 获取参数的
const bodyParser = require('body-parser');
//读写文件流
var fs = require("fs")
//引入websocket
const ws = require('nodejs-websocket');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OP0TIONS");
    res.header("X-Powered-By", "3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.get('/getString', function(req, res) {
    // console.log(5555,req.query,666,req.params,888,req.body)
    console.log(req.query)
    res.status(200)
    //json格式
    // res.json(data)
    //获取json
    fs.readFile('./data.json','utf-8',function(err,data) {
        console.log(data)
        let params = {}
        if(err) {
            console.error()
            params = {
                code:500,
                message:"读取失败"
            }
        } else {
            params = {
                code:200,
                message:"成功",
                data:data
            }
        }
        //传入页面
        res.send(params)
    })

});

app.get('/setString', function(req, res) {
    // console.log(5555,req.query,666,req.params,888,req.body)
    console.log(req.query)
    res.status(200)
    //json格式
    // res.json(data)
    //传入页面
    fs.readFile("./data.json",function(err,data){
        if(err) {
            return console.error(err)
        }
        let obj = {
            clips: req.query
        }
        let str = JSON.stringify(obj)
        fs.writeFile("./data.json",str,function(err){
            if(err) {
                console.error(err)
            }
            console.log('-------修改成功-------')
        })
    })
    let params = {
        code:200,
        message:"成功"
    }
    res.send(params)
});

let padKey = '';
const webServer = ws.createServer(conn => {
    // console.log('有一名用户连接进来了...')
    conn.on("text", function (res) {
        let resa = JSON.parse(res);
        if(resa.msg && resa.msg === 'Request connection.') {
            console.log(`${resa.role} 请求连接...`)
            console.log('key: ', conn.key)
            conn.sendText(JSON.stringify({
                "sid": conn.key,
                "msg": "服务器连接成功!"
            }));//返回给客户端的数据
            setTimeout(() => {
                conn.sendText(JSON.stringify({
                "sid": conn.key,
                "msg": `Hi, ${resa.role}.`
            }))
            }, 800)
            if(resa.role === 'Pad') {
                padKey = conn.key
            }
        }
        if(resa.clips && resa.role === 'Borwser') {
            console.log(`剪贴板更新: ${resa.clips}`)
            webServer.connections.forEach(function (conn) {
                if(conn.key == padKey) {
                    conn.sendText(JSON.stringify(resa))//返回给所有客户端的数据(相当于公告、通知)
                }
            })
        }
    })
    //监听关闭
    conn.on("close", function (code, reason) {
        console.log("连接断开...")
    })
    //监听异常
    conn.on("error",() => {
        console.log('服务异常关闭...')
    })
}).listen(8088)

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("服务启动: ", port);
})