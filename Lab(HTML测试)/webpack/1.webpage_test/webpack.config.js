const path = require('path');																 //路径变量
const Htmlplugin = require('html-webpack-plugin');					 //引入html打包环境
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//引入清理默认输出环境

const webpage = new Htmlplugin({	//因为其是一个实例函数 所以你需要new一个来调用 并指定其参数
	template: './src/index.html',
	filename: './index.html',
	title:'this is my first webpage',
	favicon:'./src/images/Icon.ico'			//引入icon图像(因为屑html插件不能自行引入css)
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

module.exports = {
	mode:'development',	//development or production
	devtool:'eval-source-map',
	resolve:{
		alias:{
			'@':path.resolve(__dirname,'./src')
		}
	},
	plugins: [webpage,notepad,search,about,cleanPlugin],	//最后通过打包的插件节点引入第三方插件
	entry: path.join(__dirname,'/src/js/javascript.js'),
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'js/bundle.js'
	},

	devServer:{
		static: './src',	//dev模式下自动live-reload到src目录
		open: true,
		host: 'localhost',
		port: 8888
	},

	module: {
		rules:[
			{test: /\.css$/, use:['style-loader','css-loader']},	// "test" is commonly used to match the file extension
			{test: /\.png$/,type:'asset/resource',generator: {filename: 'images/mediabox/[name]_[hash:8][ext]'}}, 			
			{test: /(\.jpg|ico)$/,type:'asset/resource', generator: {filename: 'images/[name]_[hash:8][ext]'}}
		  ]
  }
      // ^(carousel)+(\w?)+(\.(jpg|jpeg|png|bmp|ico|gif))$
      // /(\.jpg|jpeg|png|bmp|ico|gif)$/ 

			//webpack5当中 已经可以默认处理一些常见的文件了(url/file/...)
			//5.7新课题 如何根据不同的文件名生成在不同的目录 还是放弃吧 太麻烦了

	
}

