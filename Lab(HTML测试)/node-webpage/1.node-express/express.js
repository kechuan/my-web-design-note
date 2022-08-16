const express = require('express'),
         path = require('path'),
         open = require('open')

const app = express(),
      port = 8888,
      root = "D:\\All Local Downloads",
      routes = require('./routes/webpage')

app.get('/', (req,res,next)=>{
    console.log('visited')
    res.send('404 Error')
    next()
})

app.use('/', routes)
//当你使用路由器节点时 它会直接继承routes内的目录节点


// app.use('/*', express.static(path.join(__dirname, 'public')))

//把所有发送向根目录以及子文件下的请求 
//全部由express.static的内置中间件函数 转移到public下文件夹里
//或简写为

app.use('/public', express.static('public'))//缺省时默认为根目录/
app.use('/public', express.static('test'))//缺省时默认为根目录/
//另外这样的做法也有个好处:Express 在静态目录查找文件，因此，存放静态文件的目录名不会出现在 URL 中。

app.listen(port,()=>{
    console.log(`server listening port:${port}`)
    open(`http://localhost:${port}/`)
})