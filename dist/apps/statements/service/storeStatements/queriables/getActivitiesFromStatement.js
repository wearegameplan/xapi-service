"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var getActivityIdsFromObject = function (obj) {
    if (obj.objectType === 'Activity') {
        return [obj.id];
    }
    return [];
};
var getActivitiesFromContextActivities = function (statement, key) {
    var path = ['context', 'contextActivities', key];
    if (lodash_1.has(statement, path)) {
        var activities = lodash_1.get(statement, path);
        return lodash_1.union.apply(void 0, activities.map(getActivityIdsFromObject));
    }
    return [];
};
var getActivitiesFromStatementBase = function (statement) {
    return __spreadArrays(getActivityIdsFromObject(statement.object), getActivitiesFromContextActivities(statement, 'parent'), getActivitiesFromContextActivities(statement, 'grouping'), getActivitiesFromContextActivities(statement, 'category'), getActivitiesFromContextActivities(statement, 'other'));
};
var getActivitiesFromSubStatement = function (statement) {
    if (statement.object.objectType === 'SubStatement') {
        return getActivitiesFromStatementBase(statement.object);
    }
    return [];
};
exports.getActivitiesFromStatement = function (statement) {
    return getActivityIdsFromObject(statement.object);
};
exports.getRelatedActivitiesFromStatement = function (statement) {
    return lodash_1.union(__spreadArrays(getActivitiesFromStatementBase(statement), getActivitiesFromSubStatement(statement)));
};
