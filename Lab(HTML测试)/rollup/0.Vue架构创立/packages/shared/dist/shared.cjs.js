'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isObject = (value) => typeof value === 'object';
// 前提 共同判断语句 
const extend = Object.assign;
//Object.assign() 方法将所有的key做一次交集U合并

exports.extend = extend;
exports.isObject = isObject;
