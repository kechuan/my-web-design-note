import path from 'path'
import json from '@rollup/plugin-json'
import resolvePlugin from '@rollup/plugin-node-resolve'
import ts from 'rollup-plugin-typescript2'

const packagesDir = path.resolve(__dirname,'packages'); 
//当前目录下寻找packages(子包集合)文件夹

const packageDir = path.resolve(packagesDir,process.env.TARGET); 
// process.env node的进程环境变量 顺便判别你是线上还是开发环境 
//packages文件夹下的子包 真正的子包基准目录

const resolve = (p)=>path.resolve(packageDir,p) 
//一层层嵌套下来 简略定义解析地址 

const pkg = require(resolve('package.json'))
const name = path.basename(packageDir) 	//取文件名



const outputConfig = {			//buildOptions内匹配什么类型的模块生成什么文件名
	'esm':{
		file:resolve(`dist/${name}.esm-bundler.js`),
		format:'es',
	},
	'cjs':{
		file:resolve(`dist/${name}.cjs.js`),
		format:'cjs',
	},
	'global':{
		file:resolve(`dist/${name}.global.js`),
		format:'iife',	//iife在这里有什么用?
	}
}

const options = pkg.buildOptions;

//拿取各个package.json的自定义的buildOptions属性
console.log(options.name)

function createConfig(format,output){
	// output.name = options.name;	//buildOptions各个name属性
	return{
		input:resolve(`src/index.ts`),
		output,
		plugins:[
			json(), //json无需额外配置
			ts({
				tsconfig:path.resolve(__dirname,'tsconfig.json')	//ts插件 必须需求常规tsconfig.json
			}),
			resolvePlugin()
			
		]
	}
}

export default options.formats.map(	//将对应的键值对映射出来并最终输出
format=>createConfig(format,outputConfig[format])
)
