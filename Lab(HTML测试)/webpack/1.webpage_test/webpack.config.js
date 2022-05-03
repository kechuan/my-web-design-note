const path = require('path');

module.exports = {
	mode:'development',	//development or production
	entry: {
		js:path.join(__dirname,'/src/js/javascript.js'),
		css:path.join(__dirname,'/src/css/style.css'),
		carousel:path.join(__dirname,'/src/js/carousel.js')
		
	},

	output: {
		path: path.resolve(__dirname,'src'),
		filename: '[name].js'
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
		]
	}
}