"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NoModel_1 = __importDefault(require("jscommons/dist/errors/NoModel"));
var lodash_1 = require("lodash");
var logger_1 = __importDefault(require("../../../../../logger"));
var MissingLoadedId_1 = __importDefault(require("../../../errors/MissingLoadedId"));
var getAgentsFromStatement_1 = require("../queriables/getAgentsFromStatement");
var eagerLoadDownRefs_1 = __importDefault(require("./eagerLoadDownRefs"));
var eagerLoadUpRefs_1 = __importDefault(require("./eagerLoadUpRefs"));
var getActivitiesFromStatement_1 = require("../queriables/getActivitiesFromStatement");
var getRegistrationsFromStatement_1 = __importDefault(require("../queriables/getRegistrationsFromStatement"));
var getVerbsFromStatement_1 = __importDefault(require("../queriables/getVerbsFromStatement"));
var shortId = function (id) {
    return id[id.length - 1];
};
var shortIds = function (ids) {
    return "[" + ids.map(shortId).join(',') + "]";
};
var stack = function (value, values) {
    return lodash_1.union([value], values);
};
exports.default = (function (config, models, client) { return __awaiter(void 0, void 0, void 0, function () {
    var groupedUpRefIds, groupedDownRefs, groupedDownRefIds, getDownRefId, getUpRefIds, getDownRefs, setQueriables, traverseDown, traverseUp, traverseUpRefs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                /* istanbul ignore next */
                if (!config.enableReferencing) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, eagerLoadUpRefs_1.default(config, models, client)];
            case 1:
                groupedUpRefIds = _a.sent();
                return [4 /*yield*/, eagerLoadDownRefs_1.default(config, models, client)];
            case 2:
                groupedDownRefs = _a.sent();
                groupedDownRefIds = lodash_1.keys(groupedDownRefs);
                if (lodash_1.size(groupedUpRefIds) === 0 && lodash_1.size(groupedDownRefs) === 0) {
                    return [2 /*return*/];
                }
                getDownRefId = function (id) {
                    logger_1.default.debug('getDownRefId', shortId(id));
                    return config.repo.getDownRefId({ id: id, client: client });
                };
                getUpRefIds = function (id) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (lodash_1.has(groupedUpRefIds, id)) {
                            logger_1.default.silly('getUpRefIds cached', shortId(id));
                            return [2 /*return*/, lodash_1.get(groupedUpRefIds, id, [])];
                        }
                        logger_1.default.debug('getUpRefIds', shortId(id));
                        return [2 /*return*/, config.repo.getUpRefIds({ id: id, client: client })];
                    });
                }); };
                getDownRefs = function (targetIds) { return __awaiter(void 0, void 0, void 0, function () {
                    var loadedTargetIds, unloadedTargetIds, loadedDownRefs, unloadedDownRefs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                loadedTargetIds = lodash_1.intersection(targetIds, groupedDownRefIds);
                                unloadedTargetIds = lodash_1.difference(targetIds, groupedDownRefIds);
                                loadedDownRefs = loadedTargetIds.map(function (targetId) {
                                    if (lodash_1.has(groupedDownRefs, targetId)) {
                                        return groupedDownRefs[targetId];
                                    }
                                    /* istanbul ignore next */
                                    throw new MissingLoadedId_1.default(targetId);
                                });
                                return [4 /*yield*/, config.repo.getStatementsByIds({
                                        ids: unloadedTargetIds,
                                        client: client,
                                    })];
                            case 1:
                                unloadedDownRefs = _a.sent();
                                logger_1.default.silly('getDownRefs cached', shortIds(loadedTargetIds));
                                logger_1.default.silly('getDownRefs uncached', shortIds(unloadedTargetIds));
                                return [2 /*return*/, __spreadArrays(loadedDownRefs, unloadedDownRefs)];
                        }
                    });
                }); };
                setQueriables = function (id, givenRefIds) { return __awaiter(void 0, void 0, void 0, function () {
                    var refIds, refs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                refIds = lodash_1.pull(givenRefIds, id);
                                return [4 /*yield*/, getDownRefs(refIds)];
                            case 1:
                                refs = _a.sent();
                                logger_1.default.debug('setQueriables', shortId(id), shortIds(refIds));
                                return [2 /*return*/, config.repo.setQueriables({
                                        id: id,
                                        client: client,
                                        agents: lodash_1.union.apply(void 0, refs.map(getAgentsFromStatement_1.getAgentsFromStatement)),
                                        relatedAgents: lodash_1.union.apply(void 0, refs.map(getAgentsFromStatement_1.getRelatedAgentsFromStatement)),
                                        verbs: lodash_1.union.apply(void 0, refs.map(getVerbsFromStatement_1.default)),
                                        activities: lodash_1.union.apply(void 0, refs.map(getActivitiesFromStatement_1.getActivitiesFromStatement)),
                                        relatedActivities: lodash_1.union.apply(void 0, refs.map(getActivitiesFromStatement_1.getRelatedActivitiesFromStatement)),
                                        registrations: lodash_1.union.apply(void 0, refs.map(getRegistrationsFromStatement_1.default)),
                                    })];
                        }
                    });
                }); };
                traverseDown = function (modelId, visitedIds) { return __awaiter(void 0, void 0, void 0, function () {
                    var newVisitedIds, downRefId, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                logger_1.default.silly('traverseDown', shortId(modelId), shortIds(visitedIds));
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                newVisitedIds = stack(modelId, visitedIds);
                                return [4 /*yield*/, getDownRefId(modelId)];
                            case 2:
                                downRefId = _a.sent();
                                return [2 /*return*/, (lodash_1.includes(newVisitedIds, downRefId) ?
                                        // tslint:disable-next-line:no-use-before-declare
                                        traverseUp([], newVisitedIds, downRefId) :
                                        traverseDown(downRefId, newVisitedIds))];
                            case 3:
                                err_1 = _a.sent();
                                if (err_1.constructor === NoModel_1.default) {
                                    // tslint:disable-next-line:no-use-before-declare
                                    return [2 /*return*/, traverseUp([], [], modelId)];
                                }
                                /* istanbul ignore next */
                                throw err_1;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); };
                traverseUp = function (visitedIds, refIds, modelId) { return __awaiter(void 0, void 0, void 0, function () {
                    var newVisitedIds, newRefIds, upRefIds;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                logger_1.default.silly('traverseUp', shortIds(visitedIds), shortIds(refIds), shortId(modelId));
                                if (lodash_1.includes(visitedIds, modelId)) {
                                    return [2 /*return*/, []];
                                }
                                if (!(refIds.length > 0)) return [3 /*break*/, 2];
                                return [4 /*yield*/, setQueriables(modelId, refIds)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                newVisitedIds = stack(modelId, visitedIds);
                                newRefIds = stack(modelId, refIds);
                                return [4 /*yield*/, getUpRefIds(modelId)];
                            case 3:
                                upRefIds = _a.sent();
                                // tslint:disable-next-line:no-use-before-declare
                                return [2 /*return*/, traverseUpRefs(newVisitedIds, newRefIds, upRefIds)];
                        }
                    });
                }); };
                traverseUpRefs = function (visitedIds, refIds, upRefIds) { return __awaiter(void 0, void 0, void 0, function () {
                    var traversedIds;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                logger_1.default.silly('traverseUpRefs', shortIds(visitedIds), shortIds(refIds), shortIds(upRefIds));
                                return [4 /*yield*/, Promise.all(upRefIds.map(function (upRefId) {
                                        return traverseUp(visitedIds, refIds, upRefId);
                                    }))];
                            case 1:
                                traversedIds = _a.sent();
                                return [2 /*return*/, lodash_1.union.apply(void 0, __spreadArrays([visitedIds, refIds], traversedIds))];
                        }
                    });
                }); };
                logger_1.default.debug('Updating references for storage');
                return [4 /*yield*/, models.reduce(function (results, model) { return __awaiter(void 0, void 0, void 0, function () {
                        var visitedIds, modelId, traversedIds, traversedIds;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, results];
                                case 1:
                                    visitedIds = _a.sent();
                                    modelId = model.statement.id;
                                    logger_1.default.debug('Updating references', shortId(modelId));
                                    if (lodash_1.includes(visitedIds, modelId)) {
                                        return [2 /*return*/, visitedIds];
                                    }
                                    if (!(model.statement.object.objectType !== 'StatementRef')) return [3 /*break*/, 3];
                                    return [4 /*yield*/, traverseUp([], [], modelId)];
                                case 2:
                                    traversedIds = _a.sent();
                                    return [2 /*return*/, lodash_1.union(visitedIds, traversedIds)];
                                case 3: return [4 /*yield*/, traverseDown(modelId, [])];
                                case 4:
                                    traversedIds = _a.sent();
                                    return [2 /*return*/, lodash_1.union(visitedIds, traversedIds)];
                            }
                        });
                    }); }, Promise.resolve([]))];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
