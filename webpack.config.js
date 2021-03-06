const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist/')
	},
	devtool: "source-map",
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: 'src/index.html'
		}),
		new CopyWebpackPlugin([
			{from: 'src/templates', to: 'templates'}
		])
	],
	module: {
		rules: [
			{
				test:/\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				test:/\.(jpeg|jpg|png|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: './img'
						}
					} 
				]
			},
			{
				test: /\.mst$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: './templates',
							name: '[name].[ext]'
						}
					}
				]
			}
		]
	}
};