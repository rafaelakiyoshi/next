const os = require('os');
const path = require('path');
const { parsed: localEnv } = require('dotenv').config({
  path: path.resolve(__dirname, `./environments/.env.${process.env.ENV}`)
});
var exports = (module.exports = {});
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
exports.NODE_ENV = NODE_ENV;
exports.IS_DEV = NODE_ENV === 'development';
exports.IS_PROD = NODE_ENV === 'production';
exports.IS_TEST = NODE_ENV === 'test';

exports.enviroments = localEnv;

// logger: config.moleculer.logger == true ? bindings => logger(bindings) : true,
