const express = require('express'),
         open = require('open'),
         path = require('path')
const app = express()

const port = 8888

function getIPAdress() {
    const IPinterfaces = require('os').networkInterfaces(); //获取os层下所有的接入网络
    let IP_hosts = []

    for (let IP_addr in IPinterfaces) {   //第一层:在所有网络里面遍历每一个网络
        let cursor_addr = IPinterfaces[IP_addr]; //存储当前指向网络
        for (let i = 0; i < cursor_addr.length; i++) { //第二层:在当前网络里面寻找address属性
            let cursor_elem = cursor_addr[i];

            if (cursor_elem.family === 'IPv4' && !cursor_elem.internal) {
              //初期:family字段必须为IPV4 且不为本机地址 => 基本指代 局域网IPV4地址
                IP_hosts.push(cursor_elem.address)
                
            }

            if (cursor_elem.family === 'IPv6' && !cursor_elem.internal && cursor_elem.address.length<=24) {
              //全局IPV6地址
                IP_hosts.push(cursor_elem.address)
                
            }
        }
    }
    return IP_hosts
}


app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`App listening at ${port}`)
  open(`http://localhost:${port}`)
})