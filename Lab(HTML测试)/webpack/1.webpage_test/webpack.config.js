const path = require('path');											//路径变量
const Htmlplugin = require('html-webpack-plugin');					 	//引入html打包环境
const {CleanWebpackPlugin} = require('clean-webpack-plugin');			//引入清理默认输出环境
const WebpackBar = require('webpackbar');

const webpage = new Htmlplugin({	//因为其是一个实例函数 所以你需要new一个来调用 并指定其参数
	template: './src/index.html',
	filename: './index.html',
	title:'this is my first webpage',
	favicon:'./src/images/Icon.ico',			//引入icon图像(因为屑html插件不能自行引入css)
	inject:false
})

const notepad = new Htmlplugin({
	template: './src/sidebar/notepad.html',
	filename: './sidebar/notepad.html',
	inject:false
	
})

const search = new Htmlplugin({
	template: './src/sidebar/search.html',
	filename: './sidebar/search.html',
	inject:false
})

const about = new Htmlplugin({
	template: './src/sidebar/about.html',
	filename: './sidebar/about.html',
	inject:false
})

const cleanPlugin = new CleanWebpackPlugin()	//自动配置?
const progressBar = new WebpackBar({
	color: 'green',  // 默认green，进度条颜色支持HEX
	basic: false,   // 默认true，启用一个简单的日志报告器
	profile:false  // 默认false，启用探查器。
})

module.exports = {
	mode:'development',	//development or production
	// target:['web','es5'],
	devtool:'eval',
	resolve:{
		alias:{
			'@':path.resolve(__dirname,'./src')
		}
	},
	plugins: [webpage,notepad,search,about,cleanPlugin,progressBar],	//最后通过打包的插件节点引入第三方插件
	optimization:{
		// usedExports:true		//优化处理端口打开
		splitChunks: {
      		chunks: 'all',	// include all types of chunks
    	},
	},
	entry: {
		javascript:{import:path.join(__dirname,'/src/js/javascript.js'),dependOn: 'shared'},
		sidebar_css:{import:path.join(__dirname,'/src/sidebar/css.js')},
		shared: ['jquery']	//共享合集
	},
	output: {
		path: path.resolve(__dirname,'./dist'),
		filename: 'js/[name].js'
	},

	devServer:{
		static: './src',	//dev模式下自动live-reload到src目录
		open: true,
		host: 'localhost',
		port: 8888,
		// client: { progress: true }
	},

	module: {
	  	rules:[
			{test: /\.css$/,use:['style-loader','css-loader']},	// "test" is commonly used to match the file extension
			{test: /\.png$/,type:'asset/resource',generator: {filename: 'images/mediabox/[name][ext]'}}, 			
			{test: /\.jpg$/,type:'asset/resource', generator: {filename: 'images/[name][ext]'}},
			{parser:{dataUrlCondition: {maxSize: 4 * 1024}}}	//当模块源码小于4kb时 换算成base64直接注入包内容等待解析
	    ]    	
	}
			//webpack5当中 已经可以默认处理一些常见的文件了(url/file/...)
			//5.7新课题 如何根据不同的文件名生成在不同的目录 现在都还不知道怎么操作
}