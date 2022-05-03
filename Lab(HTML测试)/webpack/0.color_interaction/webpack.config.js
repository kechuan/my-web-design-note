const path = require('path');

module.exports = {
	mode:'development',	//development or production
	entry: path.join(__dirname,'./src/index.js'),
	output: {
		path: path.join(__dirname,'src'),
		filename: 'bundle.js'
	},

	devServer:{
		static: './src',
		open: true,
		host: 'localhost',
		port: 8888
	}
}