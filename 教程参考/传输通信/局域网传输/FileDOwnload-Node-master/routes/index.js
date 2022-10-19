import express from 'express'
import path from 'node:path'
import fs from "node:fs"
import os from "node:os"
import process from "node:process"
// import async from 'async' //async await无法在router配置上使用？？？

import {profileWrite,profileScan,login,preferSetting} from '../public/js/data.js'

// var cookieParser = require('cookie-parser')

var router = express.Router();  //路由设置 开始

var port = 8888;
process.traceDeprecation = true

//转变class构造存储 希望以后以账号偏好设置继承数据能够用得上 比如stat extend passport之类的操作

function test(){
    return 'listview'
}

class defaultConfig{
    constructor(){
        this.surfing_path=''
        this.view='gridview'
        this.status=''
        this.description=''       
    }
}

class prefer extends defaultConfig{
    
}

var Now = new prefer()

router.get('/setcookies', (req, res) => {
    res.send('cookies setted!')
})

router.get('/',(req,res)=>{
//TODO：对传入url的文字加密 直接暴露明文在url是很危险的行为

var username = req.query.username
var password = req.query.password
var password_confirm = req.query.password_confirm


    if(username&&password&&password_confirm!=undefined){
        res.redirect(`/register?username=${username}&password=${password}`)
    }

    if(username&&password!=undefined){
        console.log('try login');
        switch(login(username,password)){
            case 'not exist': {
                Now.description = `Account ${req.query.username} not exist!`
                res.redirect('/login/failed') 
                break;
            }

            case 'wrong': {
                Now.description = `The password or account is not correct!`
                res.redirect('/login/failed')
                break;
            }; 

            case 'succ': {
                
                Now.view = preferSetting(username)
                console.log(`welcome ${req.query.username}! your view:${preferSetting(username)}`)
                
                res.redirect('/index')
                break;
            };

            // default: console.log(login(username,password)); break;
        }
    }
    
    res.render('login',{
        title: 'Login',
        status: Now.status,
        description: Now.description
    })

    
})

router.get('/login/:status',(req,res)=>{
    Now.status = req.params.status
    res.redirect('/')
})

router.get('/register',(req,res)=>{
    let redirect_path = Now.surfing_path
    if(profileScan(req.query.username,req.query.password)){
        console.log('reg failed!')
        res.redirect('/login/failed')
    }

    else{
        res.redirect('/index')
        profileWrite(req.query.username,req.query.password)
        
    }
})

router.get('/index', function (req, res, next) {
    var reqIp = getIPAdress() +':'+port;
    res.render('test', 
    {
        title: 'Express',
        dataip: reqIp,
    });
});


//file页面下 渲染indexdir
router.get('/file', function (req, res, next) {
    var reqIp = getIPAdress() +':'+port;
    res.render('indexdir', {dataip: reqIp});

});

//文件列表 需求通过上层携带 ?path='' 以访问 直接访问无效 由file跳转以携带字样

//因主要功能都在这个页面实现 所以考虑直接在这个页面内添加传送标记节点 surfing_path
router.get('/filelist', function (req, res, next) {
    Now.surfing_path = req.url 
    let filepath = req.query.path.slice(2); //截取盘符之后的目录信息
    let path = req.query["path"];
    if (path != null) {
        filepath = path + "\\"; //访问盘符后的目录有效时添加\ D: => D:\
    }
    var reqIp = getIPAdress() +':'+port;

    var filedetail = informationList(filepath);
    //数据解构法赋值
    var [dirlist,filelist,sizelist,extlist] = filedetail
    
    //处理文件名显示问题
    var filenamelist = new Array();
    var dirnamelist = new Array();

    for (var i=0;i<filelist.length;i++){
        var temp = decodeURIComponent(filelist[i])
        filenamelist[i] = temp.split('\\').slice(-1).toString();   
        //浅复制最后一位的slice 但是会变成数组的形式 需要手动转换一次变成字符串
    }

    for (var i=0;i<dirlist.length;i++){
        var temp = dirlist[i].split("\\");
        dirnamelist[i] = temp[temp.length - 1];
    }

    res.render('file', {
        dataip: reqIp,
        filepath: filepath,
        view: Now.view,
        filelist: filelist,
        dirlist: dirlist,
        dirnamelist: dirnamelist,
        filenamelist: filenamelist,
        sizelist: sizelist,
        extlist: extlist
        // 为什么 即使它们不主动去传递 ejs也能接收到变量？
        //最搞笑的是转成ES导入之后就需要强制声明这些变量了
    });
    //将res的变量映射到ejs模板 以供调用
    
})

//上传要干什么？ 我建议呼出一个独立的弹窗 最好有css 这点可以抄github的 如果可以的话
//引入一点css框架吧 是时候该知道怎么用那些css框架了
router.get('/upload', (req, res)=>{
    res.redirect('/file')
})


//下载文件 当访问到/filedownload的时候express直接跳出下载
//比如:"http://192.168.1.144:8888/filedownload?path=E:\"
//顺带一提 如果直接filedownload访问文件夹/硬盘 是直接会没有响应的
//因此对于文件夹来说 才会接入filelist

router.get('/filedownload', function (req, res) {
    //EXP:/filedownload?path=D:\All%20Local%20Downloads\
    //[Airota&LoliHouse]%20Deaimon%20-%2008%20[WebRip%201080p%20HEVC-10bit%20AAC%20ASSx2].mkv
    //但是query本身的&%等特殊字符又会被解析 怎么办。。 那就先编码url再传输然后解压就完事

    let path = req.query.path
    let filepath = decodeURIComponent(path); //将url的ascii码信息转译回正常的编码
    downloadFile(filepath, res, req);
});

//透过传递并redirect修改视图 缺点则是无法分离 如果有多个会话接入的时候
//则会共享同一个状态 所以才需要迟早将这种功能迟早并入到账号db-偏好设置里
//或者独立成cookies设置 因为现在的session至少我现在做不到分离客户端的id

//这样 如果要精简json文件 那最好的做法自然就是先做一份deafult_options.json
//然后再让每个profile里写偏好设置(prefer)
router.get('/view/:view', (req,res)=>{
    let redirect_path = Now.surfing_path
    Now.view = req.params.view; //全局属性 不能用var 获取伪类选择的属性
    req.session.view = Now.view

    res.redirect(redirect_path)
})



//路径找到末尾了 那 就返回404罢
router.get('/*',(req, res)=>{
    console.log('404 Error and handle it');
    var reqIp = getIPAdress() +':'+port;
    res.render('error',{
        dataip: reqIp
    })
})

/**
 * 文件列表详细信息获取
 * @param filepath
 */
function informationList(filepath){

var [informationlist,dirlist,filelist,sizelist,extlist] = [[],[],[],[],[]];

//不过神奇的是 无法使用这种解构的方法来快速定义多个空变量,只能用这种方法来快速定义多个空数组

    var files = fs.readdirSync(filepath);
    files.forEach((file)=>{
        if (fs.existsSync(filepath + file)) {
            var fullname = filepath + file;

            if (fs.lstatSync(fullname).isDirectory()) {
                dirlist.push(fullname);
            }

            else{
                filelist.push(encodeURIComponent(fullname));
                sizelist.push(`${fs.statSync(fullname).size}`);
                extlist.push(path.extname(fullname).toLowerCase());
            }
        }

        
    });
    
    informationlist.push(dirlist, filelist, sizelist, extlist)
    return informationlist
}

/**
 * 文件下载
 * @param filepath
 * @param res
 */
function downloadFile(filepath, res, req) {
    // console.log(filepath)
    var filepathTemp = filepath.split("\\");
    
    // var filename = filepathTemp[filepathTemp.length - 1];
    var filename = filepathTemp[-1];
    res.download(filepath, filename, (err)=>{
        if (err) {
            console.log(err);
        } else {
            console.log('Send', filename, 'To:', req.ip, 'Success');
        }
    });
}

/**
 * 获取本机ip地址
 * @returns {*}
 */
function getIPAdress(){
    /*
    一旦遇到virtualBox等虚拟网卡 就会被优先返回虚拟的ipv4地址 这就相当于一个另一个localhost
    以后看看能不能用少量的代码解决掉吧 它们特征都是192.168.*.*的 难道只能用关键字排除?
    TODO:ipv6支持
    */
    var interfaces = os.networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}

export {getIPAdress, router}
