const path = require('path');

module.exports = {
	mode:'development',	//development or production
	entry: path.join(__dirname,'/src/js/javascript.js'),
	output: {
		path: path.resolve(__dirname,'src'),
		filename: 'bundle.js'
	},

	devServer:{
		static: './src',
		open: true,
		host: 'localhost',
		port: 8888
	},

	module: {
		rules:[
			{test: /\.css$/, use:['style-loader','css-loader']}	//test匹配css后缀 对其使用两个loader
			// {test: /(\.jpg|jpeg|png|bmp|ico|gif)$/}	//webpack5当中 已经可以默认处理一些常见的文件了(url/file/...)

		]
	}
}