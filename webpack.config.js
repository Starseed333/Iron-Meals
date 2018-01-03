var webpack = require("webpack");
var path = require("path");

module.exports = {
	entry: "./app/actions/app.js",
	output: {
		filename: "public/js/bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: /app/,
				loader: "babel-loader",
				query: {
					presets: ["react", "es2015"]
				}
			}
		]
	},
	devtool: "eval-source-map"
};
