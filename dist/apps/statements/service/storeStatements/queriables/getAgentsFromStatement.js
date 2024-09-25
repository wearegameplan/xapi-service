"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var getActorIdent_1 = __importDefault(require("../../../utils/getActorIdent"));
exports.getActorIdents = function (actor) {
    try {
        return [getActorIdent_1.default(actor)];
    }
    catch (err) {
        return [];
    }
};
var getGroupMemberIdents = function (group) {
    if (group.member === undefined) {
        return [];
    }
    // tslint:disable-next-line:no-use-before-declare
    return lodash_1.union.apply(void 0, group.member.map(getAgentsFromObject));
};
exports.getGroupIdents = function (group) {
    var idents = exports.getActorIdents(group);
    var members = getGroupMemberIdents(group);
    return __spreadArrays(idents, members);
};
var getAgentsFromObject = function (obj) {
    switch (obj.objectType) {
        case 'Agent':
            return exports.getActorIdents(obj);
        case 'Group':
            return exports.getGroupIdents(obj);
        default:
            return [];
    }
};
var getAgentsFromTeam = function (statement) {
    var path = ['context', 'team'];
    if (lodash_1.has(statement, path)) {
        var team = lodash_1.get(statement, path);
        return getAgentsFromObject(team);
    }
    return [];
};
var getAgentsFromInstructor = function (statement) {
    var path = ['context', 'instructor'];
    if (lodash_1.has(statement, path)) {
        var team = lodash_1.get(statement, path);
        return getAgentsFromObject(team);
    }
    return [];
};
var getRelatedAgentsFromStatementBase = function (statement) {
    return __spreadArrays(exports.getAgentsFromStatement(statement), getAgentsFromTeam(statement), getAgentsFromInstructor(statement));
};
var getAgentsFromSubStatement = function (statement) {
    if (statement.object.objectType === 'SubStatement') {
        return getRelatedAgentsFromStatementBase(statement.object);
    }
    return [];
};
exports.getAgentsFromStatement = function (statement) {
    return lodash_1.union(__spreadArrays(getAgentsFromObject(statement.actor), getAgentsFromObject(statement.object)));
};
exports.getRelatedAgentsFromStatement = function (statement) {
    return lodash_1.union(__spreadArrays(getRelatedAgentsFromStatementBase(statement), getAgentsFromObject(statement.authority), getAgentsFromSubStatement(statement)));
};
