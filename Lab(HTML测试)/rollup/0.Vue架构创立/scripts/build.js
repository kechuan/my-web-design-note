import Fs from 'fs'
import {execa} from 'execa' 

const AllPackages = Fs.readdirSync('packages').filter(	//返回读取进来的包
	filename =>{
	if(!Fs.statSync(`packages/${filename}`).isDirectory()){	//如果packages内读取的不是文件夹 则忽略
		return false;
	}
	return true;
});
console.log(AllPackages);	//显示目前vue项目下的所有子包(数组形式)

async function build(target){
	await execa('rollup',['-c','--environment',`TARGET:${target}`],{stdio:'inherit'})	
	//根据target变量的变化打包
	//inherit属性让其他线程打包信息共享给主线程(cmd)上显示
	console.log(target); //返回当前打包buildoptions信息
}


function runParallel(AllPackages,iteratorFn){
	var result = [];
	// for(let items in AllPackages)
	for(let items in AllPackages){
		const p = iteratorFn(`${AllPackages[items]}`)	//数组的每个值提取
		result.push(p);
	}
	return Promise.all(result);

}


runParallel(AllPackages,build)