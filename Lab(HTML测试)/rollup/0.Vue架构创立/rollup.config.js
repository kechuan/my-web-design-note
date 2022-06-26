import path from 'path'
import json from '@rollup/plugin-json'
import resolvePlugin from '@rollup/plugin-node-resolve'
import ts from 'rollup-plugin-typescript2'

const packagesDir = path.resolve(__dirname,'packages'); 
//��ǰĿ¼��Ѱ��packages(�Ӱ�����)�ļ���

const packageDir = path.resolve(packagesDir,process.env.TARGET); 
// process.env node�Ľ��̻������� ˳���б��������ϻ��ǿ������� 
//packages�ļ����µ��Ӱ� �������Ӱ���׼Ŀ¼

const resolve = (p)=>path.resolve(packageDir,p) 
//һ���Ƕ������ ���Զ��������ַ 

const pkg = require(resolve('package.json'))
const name = path.basename(packageDir) 	//ȡ�ļ���



const outputConfig = {			//buildOptions��ƥ��ʲô���͵�ģ������ʲô�ļ���
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
		format:'iife',	//iife��������ʲô��?
	}
}

const options = pkg.buildOptions;

//��ȡ����package.json���Զ����buildOptions����
console.log(options.name)

function createConfig(format,output){
	// output.name = options.name;	//buildOptions����name����
	return{
		input:resolve(`src/index.ts`),
		output,
		plugins:[
			json(), //json�����������
			ts({
				tsconfig:path.resolve(__dirname,'tsconfig.json')	//ts��� �������󳣹�tsconfig.json
			}),
			resolvePlugin()
			
		]
	}
}

export default options.formats.map(	//����Ӧ�ļ�ֵ��ӳ��������������
format=>createConfig(format,outputConfig[format])
)
