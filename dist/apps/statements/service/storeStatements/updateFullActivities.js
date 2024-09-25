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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var getContextActivities = function (statement) {
    if (statement.context !== undefined &&
        statement.context.contextActivities !== undefined) {
        var contextActivities = statement.context.contextActivities;
        return __spreadArrays((contextActivities.category === undefined ? [] : contextActivities.category), (contextActivities.grouping === undefined ? [] : contextActivities.grouping), (contextActivities.other === undefined ? [] : contextActivities.other), (contextActivities.parent === undefined ? [] : contextActivities.parent));
    }
    return [];
};
var getObjectActivity = function (statement) {
    if (statement.object.objectType === 'Activity') {
        return [statement.object];
    }
    return [];
};
var getStatementActivities = function (statement) {
    return __spreadArrays(getObjectActivity(statement), getContextActivities(statement));
};
exports.default = (function (_a) {
    var config = _a.config, models = _a.models, client = _a.client;
    return __awaiter(void 0, void 0, void 0, function () {
        var activities, definedActivities, groupedActivities, updates;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!config.enableActivityUpdates) {
                        return [2 /*return*/];
                    }
                    activities = lodash_1.flatMap(models, function (model) {
                        return __spreadArrays(getStatementActivities(model.statement), (model.statement.object.objectType === 'SubStatement' ?
                            getStatementActivities(model.statement.object) :
                            []));
                    });
                    definedActivities = activities.filter(function (activity) {
                        return activity.definition !== undefined && (activity.definition.name !== undefined ||
                            activity.definition.description !== undefined ||
                            activity.definition.extensions !== undefined ||
                            activity.definition.moreInfo !== undefined ||
                            activity.definition.type !== undefined);
                    });
                    groupedActivities = lodash_1.groupBy(definedActivities, function (activity) {
                        return activity.id;
                    });
                    updates = lodash_1.map(groupedActivities, function (matchingActivities, activityId) {
                        var names = matchingActivities.map(function (matchingActivity) {
                            return (matchingActivity.definition !== undefined &&
                                matchingActivity.definition.name !== undefined) ? matchingActivity.definition.name : {};
                        });
                        var descriptions = matchingActivities.map(function (matchingActivity) {
                            return (matchingActivity.definition !== undefined &&
                                matchingActivity.definition.description !== undefined) ? matchingActivity.definition.description : {};
                        });
                        var extensions = matchingActivities.map(function (matchingActivity) {
                            return (matchingActivity.definition !== undefined &&
                                matchingActivity.definition.extensions !== undefined) ? matchingActivity.definition.extensions : {};
                        });
                        var types = matchingActivities.map(function (matchingActivity) {
                            return (matchingActivity.definition !== undefined &&
                                matchingActivity.definition.type !== undefined) ? matchingActivity.definition.type : undefined;
                        }).filter(function (value) {
                            return value !== undefined;
                        });
                        var moreInfos = matchingActivities.map(function (matchingActivity) {
                            return (matchingActivity.definition !== undefined &&
                                matchingActivity.definition.moreInfo !== undefined) ? matchingActivity.definition.moreInfo : undefined;
                        }).filter(function (value) {
                            return value !== undefined;
                        });
                        return __assign(__assign({ activityId: activityId, name: Object.assign.apply(Object, __spreadArrays([{}], names)), description: Object.assign.apply(Object, __spreadArrays([{}], descriptions)), extensions: Object.assign.apply(Object, __spreadArrays([{}], extensions)) }, (types.length > 0 ? { type: types[types.length - 1] } : {})), (moreInfos.length > 0 ? { moreInfo: moreInfos[moreInfos.length - 1] } : {}));
                    });
                    return [4 /*yield*/, config.repo.updateFullActivities({ updates: updates, client: client })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
