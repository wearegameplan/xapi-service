"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var removeDuplications = function (elements, mapper, uniqueElements, existingValues) {
    if (elements.length === 0) {
        return uniqueElements;
    }
    var element = elements[0], nextElements = elements.slice(1);
    var value = mapper(element);
    var isUniqueValue = existingValues.indexOf(value) === -1;
    var nextUniqueElements = isUniqueValue ? __spreadArrays(uniqueElements, [element]) : uniqueElements;
    var nextExistingValues = isUniqueValue ? __spreadArrays(existingValues, [value]) : existingValues;
    return removeDuplications(nextElements, mapper, nextUniqueElements, nextExistingValues);
};
exports.default = (function (arr, mapper) {
    return removeDuplications(arr, mapper, [], []);
});
