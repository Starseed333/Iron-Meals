var webpack = require("webpack");
var path = require("path");

var config = {
	entry: path.resolve("./src/index.js"),
	output: {
		path: path.resolve('./public/js'),
		filename: "bundle.js"
	},
	resolve: {
    	extensions: ['', '.js', '.jsx']
  	},

	module: {
		loaders: [
			{
					test: /\.jsx?$/, 
					include: /src/,
					loader: "babel-loader",
					query: {
						presets: ["react", "es2015", "stage-0"]
					}
				},

			{
               test:/\.css$/,
               loader:'style-loader!css-loader'
           }
		]
	},

	node: {
		fs: 'empty'
	},
	devtool: "eval-source-map"

};

module.exports = config;