var path = require('path'),
    fs   = require('fs')

var pathname = 'D:\\All Local Downloads'

var filePath = pathname.replace(/\\/g,'/')

filePath = decodeURI(filePath); //将url的ascii码信息转译回正常的编码

fs.exists(filePath, (exists)=>{
    if(exists){
    var dirlist = fs.readdirSync(filePath) //文件列表信息
        for(let x of dirlist){
        var fullname = pathname+'\\'+x;
            fs.stat(fullname, (err, status)=>{
                if(status.isDirectory()){
                    console.log(`Dir:${pathname+'\\'+x}`)
                }

                else{
                    console.log(`File:${pathname+'\\'+x}`)
                }
            })
        }
    }
})

//这样就能实现单个文件夹下的文件与文件夹列表获取