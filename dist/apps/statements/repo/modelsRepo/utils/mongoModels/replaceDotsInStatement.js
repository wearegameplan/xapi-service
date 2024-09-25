"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var modr = __importStar(require("../../../../utils/modr"));
exports.replaceDotsInExtensions = function (searchValue, replaceValue) {
    return modr.modifyType(Object, function (extensions) {
        var encodedRootExtensions = lodash_1.mapKeys(extensions, function (_value, key) {
            return key.replace(searchValue, replaceValue);
        });
        var encodedExtensions = lodash_1.mapValues(encodedRootExtensions, function (value) {
            if (lodash_1.isPlainObject(value)) {
                return exports.replaceDotsInExtensions(searchValue, replaceValue)(value);
            }
            return value;
        });
        return encodedExtensions;
    });
};
var replaceDotsInParent = function (searchValue, replaceValue) {
    return modr.modifySchema({
        extensions: exports.replaceDotsInExtensions(searchValue, replaceValue),
    });
};
var replaceDotsInActivity = function (searchValue, replaceValue) {
    return modr.modifySchema({
        definition: replaceDotsInParent(searchValue, replaceValue),
    });
};
var replaceDotsInActivities = function (searchValue, replaceValue) {
    return modr.modifyCollection(function () { return replaceDotsInActivity(searchValue, replaceValue); });
};
var replaceDotsInObject = function (searchValue, replaceValue) {
    return function (data) {
        if (data.objectType === 'Activity') {
            return replaceDotsInActivity(searchValue, replaceValue)(data);
        }
        if (data.objectType === 'SubStatement') {
            // tslint:disable-next-line:no-use-before-declare
            return replaceDotsInStatement(searchValue, replaceValue)(data);
        }
        return data;
    };
};
var replaceDotsInContext = function (searchValue, replaceValue) {
    return modr.modifySchema({
        contextActivities: modr.modifySchema({
            category: replaceDotsInActivities(searchValue, replaceValue),
            grouping: replaceDotsInActivities(searchValue, replaceValue),
            parent: replaceDotsInActivities(searchValue, replaceValue),
            other: replaceDotsInActivities(searchValue, replaceValue),
        }),
        extensions: exports.replaceDotsInExtensions(searchValue, replaceValue),
    });
};
var replaceDotsInStatement = function (searchValue, replaceValue) {
    return modr.modifySchema({
        object: replaceDotsInObject(searchValue, replaceValue),
        context: replaceDotsInContext(searchValue, replaceValue),
        result: replaceDotsInParent(searchValue, replaceValue),
    });
};
exports.encodeDotsInStatement = replaceDotsInStatement(/\./g, '&46;');
exports.decodeDotsInStatement = replaceDotsInStatement(/&46;/g, '.');
