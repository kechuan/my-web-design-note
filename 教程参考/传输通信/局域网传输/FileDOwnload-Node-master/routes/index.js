var express = require('express');
var fs = require("fs");
var router = express.Router();

//TODO html页面优化
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('test', {title: 'Express'});
});



//file页面下 渲染indexdir
router.get('/file', function (req, res, next) {
    reqIp = getIPAdress() + ":3000";
    res.render('indexdir', {dataip: reqIp});
});

//下载文件 当访问到/filedownload的时候express直接跳出下载
//比如:"http://192.168.1.144:3000/filedownload?path=E:\"
//顺带一提 如果直接filedownload访问文件夹/硬盘 是直接会没有响应的
//因此对于文件夹来说 才会接入filelist

router.get('/filedownload', function (req, res, next) {
    let filepath = req.query.path;
    downloadFile(filepath, res, req);
});


//文件列表 
router.get('/filelist', function (req, res, next) {
    let filepath = req.query.path.slice(2) || "D\:\\All Local Downloads";
    let path = req.query["path"];
    console.log(path)
    if (path != null) {
        filepath = path + "\\";
    }
    reqIp = getIPAdress() + ":3000";
    dirlist = getDirList(filepath);
    filelist = getFileList(filepath);
    // console.log(filelist);
    // console.log(dirlist);

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
    res.render('index', {
        dataip: reqIp,
        filelist: filelist,
        dirlist: dirlist,
        dirnamelist: dirnamelist,
        filenamelist: filenamelist,
        filepath: filepath
    });
    //将res的变量映射到ejs模板 以供调用
})

/**
 * 文件列表获取
 * @param filepath
 * @param res
 */
function getFileList(filepath, res) {
    var i = 0;
    var filelist = new Array();
    // console.log(filepath);
    var files = fs.readdirSync(filepath);
    files.forEach(function (file) {
        if (fs.existsSync(filepath + file)) {
            if (fs.lstatSync(filepath + file).isDirectory()) {
                // console.log("FileDir:", filepath + file);
            } else {
                filelist[i++] = filepath + file;
                console.log("File:", filelist[i - 1]);
            }
        }
    });
    return filelist;
}

/**
 * 文件目录获取
 * @param filepath
 * @param res
 */
function getDirList(filepath, res) {
    var i = 0;
    var dirlist = new Array();
    var files = fs.readdirSync(filepath);
    files.forEach(function (file) {
        if (fs.existsSync(filepath + file)) {
            if (fs.lstatSync(filepath + file).isDirectory()) {
                // console.log("我是目录", filepath + file);
                dirlist[i++] = filepath + file;
            } else {
                // console.log("我是文件", filepath + file);
            }
        }
    });

    return dirlist;
}

/**
 * 文件下载
 * @param filepath
 * @param res
 */
function downloadFile(filepath, res, req) {
    var filepathTemp = filepath.split("\\");
    var filename = filepathTemp[filepathTemp.length - 1];
    // console.log(filepathTemp);
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
