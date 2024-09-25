"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultValue = function (value) {
    return function (data) {
        return data === undefined ? value() : data;
    };
};
exports.overrideValue = function (value) {
    return function () {
        return value;
    };
};
exports.keepValue = function (data) { return data; };
exports.modifyType = function (type, modifier) {
    return function (data) {
        return (data !== undefined && data !== null && data.constructor === type ?
            modifier(data) :
            data);
    };
};
exports.modifySchema = function (schema) {
    return exports.modifyType(Object, function (data) {
        return Object.keys(schema).reduce(function (newData, key) {
            var _a;
            var value = schema[key](data[key]);
            return __assign(__assign({}, newData), (value === undefined ? {} : (_a = {}, _a[key] = value, _a)));
        }, data);
    });
};
exports.modifyRestrictedSchema = function (schema) {
    return exports.modifyType(Object, function (data) {
        return Object.keys(schema).reduce(function (newData, key) {
            var _a;
            var value = schema[key](data[key]);
            return __assign(__assign({}, newData), (value === undefined ? {} : (_a = {}, _a[key] = value, _a)));
        }, {});
    });
};
exports.modifyCollection = function (modifier) {
    return exports.modifyType(Array, function (data) {
        return data.map(function (elem, index) {
            return modifier(index)(elem);
        });
    });
};
exports.composeModifiers = function (modifiers) {
    return function (data) {
        return modifiers.reduce(function (result, modifier) {
            return modifier(result);
        }, data);
    };
};
