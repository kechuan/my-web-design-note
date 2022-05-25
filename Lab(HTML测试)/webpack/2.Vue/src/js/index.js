// const non_sync = (new Promise()).then(readFile('.pnpm-debug.log','utf8'))
  
// const non_sync = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('foo');
//   }, 300);
// });


// non_sync().then(()=>{console.log("??")})

const test = new Promise(function (resolve, reject) {
    console.log(1111);  //1111
    resolve(2222);
})

.then(function (value) {console.log(value); return 3333;})  //2222
.then(function (value) {console.log(value); return value}) 
//因为上述then函数return 则下述then输出3333 直接抛出an error
//那么如果再加一层then输出value会怎么样？
.then(function (value) {console.log(value);})
//结果为undefined 这就很有意思 说明return会直接覆盖掉promise返回的resolve 
//且return只能覆盖一次 完了就整个都没了 除非再return一次原来的传入函数或者自己手动指派新值
.catch(function (err)  {console.log(err);})
.finally(function(value){console.log("value")})