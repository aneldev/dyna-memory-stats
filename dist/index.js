(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("console.table"));
	else if(typeof define === 'function' && define.amd)
		define("dyna-memory-stats", ["console.table"], factory);
	else if(typeof exports === 'object')
		exports["dyna-memory-stats"] = factory(require("console.table"));
	else
		root["dyna-memory-stats"] = factory(root["console.table"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("console.table");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isNode = typeof process !== "undefined" && !!process.memoryUsage;
if (isNode)
    __webpack_require__(0);
exports.getMemoryStats = function () {
    return isNode
        ? getMemoryStatsFromNodeJs()
        : getMemoryStatsFromBrowser();
};
var getMemoryStatsFromNodeJs = function () {
    var mem = process.memoryUsage();
    return {
        residentSetState: roundValue(mem.rss),
        heapTotal: roundValue(mem.heapTotal),
        heapUsed: roundValue(mem.heapUsed),
        heapLimit: null,
        boundCppObjects: roundValue(mem.external),
    };
};
var getMemoryStatsFromBrowser = function () {
    var mem = window.performance.memory;
    return {
        residentSetState: null,
        heapTotal: roundValue(mem.totalJSHeapSize),
        heapUsed: roundValue(mem.usedJSHeapSize),
        heapLimit: roundValue(mem.jsHeapSizeLimit),
        boundCppObjects: null,
    };
};
var intervalTimer = null;
var memoryStats = null;
exports.consoleMemoryStatsStart = function (timeout) {
    if (timeout === void 0) { timeout = 3000; }
    if (intervalTimer)
        return;
    memoryStats = [];
    intervalTimer = setInterval(exports.consoleMemoryStats, timeout);
    exports.consoleMemoryStats();
};
exports.consoleMemoryStatsStop = function () {
    clearInterval(intervalTimer);
    exports.consoleMemoryStats();
    console.table(graphTable(memoryStats, { residentSetState: 0.1, heapTotal: 0.1, heapUsed: 0.1, heapLimit: 0.1, boundCppObjects: 0.1 }));
};
exports.consoleMemoryStats = function () {
    var memStats = exports.getMemoryStats();
    memoryStats.push((memStats));
    console.log('consoleMemoryStats', JSON.stringify(memStats, null, 4));
};
var roundValue = function (value) { return Math.round(value / 1024 / 1024 * 10) / 10; };
var graphTable = function (objArray, objGraphFactor) {
    return objArray.map(function (obj) {
        var newObj = {};
        Object.keys(obj)
            .forEach(function (key) {
            newObj[key + '_graph'] = graphValue(obj[key], objGraphFactor[key]);
            newObj[key + '_value'] = obj[key];
        });
        return newObj;
    });
};
var graphValue = function (value, graphFactor) {
    return Array(Math.round(value * graphFactor)).fill('#').join('');
};


/***/ })
/******/ ]);
});