// const thenFs = require('then-fs')   //CommonJS
// import fs from 'fs'     //ES6
import thenFs from 'then-fs'

thenFs.readFile('1.txt','utf8')
    .then(r1 => {
       console.log(r1)
       return thenFs.readFile('2.txt','utf8')
    })

	.then(r2 => {
       console.log(r2)
       return thenFs.readFile('3.txt','utf8')
    })

	.then(r3 => {
       console.log(r3)
    })
	

// fs.readFile('1.txt','utf8',function(err,data){console.log(data)})
// fs.readFile('2.txt','utf8',function(err,data){console.log(data)})
// fs.readFile('3.txt','utf8',function(err,data){console.log(data)})

// const data1 = fs.readFileSync('1.txt','utf8');
// console.log("同步读取: " + data1);
// const data2 = fs.readFileSync('2.txt','utf8');
// console.log("同步读取: " + data2);
// const data3 = fs.readFileSync('3.txt','utf8');
// console.log("同步读取: " + data3);
