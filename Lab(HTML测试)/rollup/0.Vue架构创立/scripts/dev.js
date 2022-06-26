import Fs from 'fs'
import {execa} from 'execa' 

const target = 'reactivity'

console.log(AllPackages);	//显示目前vue项目下的所有子包(数组形式)

async function build(target){
	await execa('rollup',['-cw','--environment',`TARGET:${target}`],{stdio:'inherit'})	
	//根据target变量的变化打包
	//inherit属性让其他线程打包信息共享给主线程(cmd)上显示
	//"-w"使得监控文件修改重新打包 应该能和webpack搭配
	console.log(target); //返回当前打包buildoptions信息
}


//这样做相对于上线环境的全局打包来说 对于单个模块下的调试更加方便
//但无法去用shared模块组 怎么去实现它?