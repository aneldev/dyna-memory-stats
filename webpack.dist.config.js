﻿// help: http://webpack.github.io/docs/configuration.html
// help: https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const package_ = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

const config = {
	target: 'node', // help: https://webpack.github.io/docs/configuration.html#target
	entry: {
		index: './src/index.ts',
	},
  externals: [nodeExternals()].concat(['fs', 'path']), // in order to ignore all modules in node_modules folder
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/dist/',
		library: package_.name,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	resolve: {
		alias: {},
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
	},
	module: {
		loaders: loaders
	},
	plugins: plugins.concat([]),
	node: {
		fs: "empty",
	},
};

module.exports = config;
