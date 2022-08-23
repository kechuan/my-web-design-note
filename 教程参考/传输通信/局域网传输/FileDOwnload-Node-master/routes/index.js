var express = require('express');
var fs = require("fs");
var router = express.Router();

//TODO html页面优化
/* GET home page.  => 默认情况下跳转至view下的test页面 */ 
router.get('/', function (req, res, next) {
    res.render('test', {title: 'Express'});
});


//file页面下 渲染indexdir
router.get('/file', function (req, res, next) {
    reqIp = getIPAdress() + ":8888";
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
    let filepath = req.query.path.slice(2); //截取盘符之后的目录信息
    // console.log(filepath)
    // console.log(req.query)
    let path = req.query["path"];
    // console.log(path)
    if (path != null) {
        filepath = path + "\\"; //访问盘符后的目录有效时添加\ D:xxx => D:\xxx
    }
    reqIp = getIPAdress() + ":8888";
    dirlist = getDirList(filepath);
    filelist = getFileList(filepath);
    sizelist = getSizeList(filepath)

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
    console.log(sizelist);

    res.render('index', {
        dataip: reqIp,
        filelist: filelist,
        dirlist: dirlist,
        dirnamelist: dirnamelist,
        filenamelist: filenamelist,
        filepath: filepath,
        // filesize: filesize
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
function getDirList(filepath) {
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

function getSizeList(filepath) {
    var i = 0;
    var sizelist = new Array();
    var files = fs.readdirSync(filepath);
    files.forEach(function (file) {
        if (fs.existsSync(filepath + file)) {
            if (fs.lstatSync(filepath + file).isDirectory()) {
                sizelist.push('-');
                i++;
                // console.log("我是目录", filepath + file);
            }  

            else {
                sizelist.push(`${fs.statSync(filepath + file).size}`);
                // sizelist[i] = fs.statSync(i).size;
                i++;
                // console.log("我是文件", filepath + file);
            }
        }
    });

    return sizelist;
}

// function getSizeList(path){
//     fs.exists(path, (exists)=>{
//         if(exists){
//             var sizelist = []
//             var dirlist = fs.readdirSync(path) //文件列表信息
//                 for(let x of dirlist){
//                     var fullname = path+'\\'+x;
//                     fs.stat(fullname, (err, status)=>{
//                         if(status.isDirectory()){
//                            sizelist.push('-') 
//                         }

//                         else{
//                             sizelist.push((fs.statSync(path+'\\'+x).size))
//                         }

//                         if(x==dirlist.pop()){
//                             console.log(sizelist)
//                             return sizelist
//                         }
//                             //非常奇怪 stat内包含的信息 只能在stat作用域下提取 甚至无法return抛出
//                     })         
//                 }
//         }
//     })
// }


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

