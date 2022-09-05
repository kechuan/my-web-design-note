var express = require('express');
var path = require('path');
var fs = require("fs");
var router = express.Router();


var port = 8888;

//TODO html页面优化
/* GET home page.  => 默认情况下跳转至view下的test页面 */ 
router.get('/', function (req, res, next) {
    reqIp = getIPAdress() +':'+port;
    res.render('test', 
        {title: 'Express',
        dataip: reqIp,
    });
});


//file页面下 渲染indexdir
router.get('/file', function (req, res, next) {
    reqIp = getIPAdress() +':'+port;
    res.render('indexdir', {dataip: reqIp});

});

//下载文件 当访问到/filedownload的时候express直接跳出下载
//比如:"http://192.168.1.144:8888/filedownload?path=E:\"
//顺带一提 如果直接filedownload访问文件夹/硬盘 是直接会没有响应的
//因此对于文件夹来说 才会接入filelist

router.get('/filedownload', function (req, res, next) {
    let filepath = req.query.path;

    downloadFile(filepath, res, req);
});


//文件列表 需求通过上层携带 ?path='' 以访问 直接访问无效 由file跳转以携带字样
router.get('/filelist', function (req, res, next) {
    console.log(req)
    let filepath = req.query.path.slice(2); //截取盘符之后的目录信息
    let path = req.query["path"];
    if (path != null) {
        filepath = path + "\\"; //访问盘符后的目录有效时添加\ D:xxx => D:\xxx
    }
    reqIp = getIPAdress() +':'+port;

    var filedetail = informationList(filepath);
    dirlist = filedetail[0];
    filelist = filedetail[1];
    sizelist = filedetail[2];
    extlist = filedetail[3];

    //处理文件名显示问题
    filenamelist = new Array();
    dirnamelist = new Array();
    for (var i=0;i<filelist.length;i++){
        var temp = filelist[i].split("\\");
        filenamelist[i] = temp[temp.length - 1];
    }

    for (var i=0;i<dirlist.length;i++){
        var temp = dirlist[i].split("\\");
        dirnamelist[i] = temp[temp.length - 1];
    }
    // console.log(filenamelist);
    // console.log(dirnamelist);
    // console.log(sizelist);
    console.log(informationList(filepath)[3])

    res.render('index', {
        dataip: reqIp,
        filelist: filelist,
        dirlist: dirlist,
        dirnamelist: dirnamelist,
        filenamelist: filenamelist,
        filepath: filepath,
        sizelist: sizelist,
        // extlist: extlist
        // 为什么 extlist即使不主动去传递 ejs也能接收到变量？
    });
    //将res的变量映射到ejs模板 以供调用
})

function informationList(filepath){
    
    var informationlist = new Array();
    var dirlist = new Array();
    var filelist = new Array();
    var sizelist = new Array();
    var extlist = new Array();

    // var i = 0;

    var files = fs.readdirSync(filepath);
    files.forEach(function (file) {
        if (fs.existsSync(filepath + file)) {
            var fullname = filepath + file;
            if (fs.lstatSync(fullname).isDirectory()) {
                dirlist.push(fullname)
            }

            else{
                filelist.push(file);
                sizelist.push(`${fs.statSync(fullname).size}`);
                extlist.push(path.extname(fullname).toLowerCase())
                
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
    var filepathTemp = filepath.split("\\");
    var filename = filepathTemp[filepathTemp.length - 1];
    res.download(filepath, filename, function (err) {
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
    var interfaces = require('os').networkInterfaces();
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


exports.router = router
exports.getIPAdress = getIPAdress
