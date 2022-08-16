const express = require('express'),
         path = require('path'),
         open = require('open')

const app = express(),
      port = 8888,
      root = "D:\\All Local Downloads"
      

app.get('/', (req,res,next)=>{
    console.log('visited')
    res.send('404 Error')
    next()
})

app.listen(port,()=>{
    console.log(`server listening port:${port}`)
    open(`http://localhost:${port}/`)
})