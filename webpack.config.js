const path = require('path');
const defaults = require('@wordpress/scripts/config/webpack.config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	...defaults,
	entry: {
		scripts: path.resolve(process.cwd(), 'src/public/dev', 'admin.tsx')
	},
	output: {
		// filename: '[name].js',
		filename: 'admin.lite.js',
		path: path.resolve(process.cwd(), 'public/dist'),
	},
	plugins: [new MiniCssExtractPlugin({
		filename:'admin.css'
	})],
	module: {
		...defaults.module,
		rules: [
			...defaults.module.rules,
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.json',
							transpileOnly: true,
						}
					}
				]
			},
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', ...(defaults.resolve ? defaults.resolve.extensions || ['.js', '.jsx'] : [])]
	}
};