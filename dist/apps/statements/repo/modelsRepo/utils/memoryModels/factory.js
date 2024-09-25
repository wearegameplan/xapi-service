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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var memoryRepo_1 = __importDefault(require("jscommons/dist/memoryRepo"));
var lodash_1 = require("lodash");
var memory_1 = __importDefault(require("../../createStatements/memory"));
var memory_2 = __importDefault(require("../../getDownRefId/memory"));
var memory_3 = __importDefault(require("../../getFullActivity/memory"));
var memory_4 = __importDefault(require("../../getHashes/memory"));
var memory_5 = __importDefault(require("../../getStatement/memory"));
var memory_6 = __importDefault(require("../../getStatements/memory"));
var memory_7 = __importDefault(require("../../getStatementsByIds/memory"));
var memory_8 = __importDefault(require("../../getUpRefIds/memory"));
var memory_9 = __importDefault(require("../../getUpRefsByIds/memory"));
var memory_10 = __importDefault(require("../../getVoidersByIds/memory"));
var memory_11 = __importDefault(require("../../getVoidersByObjectIds/memory"));
var memory_12 = __importDefault(require("../../incrementStoreCount/memory"));
var memory_13 = __importDefault(require("../../setQueriables/memory"));
var memory_14 = __importDefault(require("../../updateFullActivities/memory"));
var memory_15 = __importDefault(require("../../voidStatements/memory"));
exports.default = (function (config) {
    if (config === void 0) { config = {}; }
    var factoryState = lodash_1.defaultTo(config.state, {});
    var facadeState = {
        fullActivities: lodash_1.defaultTo(factoryState.fullActivities, []),
        statements: lodash_1.defaultTo(factoryState.statements, []),
    };
    var facadeConfig = { state: facadeState };
    return __assign(__assign({}, memoryRepo_1.default(facadeConfig)), { createStatements: memory_1.default(facadeConfig), getFullActivity: memory_3.default(facadeConfig), getHashes: memory_4.default(facadeConfig), getStatement: memory_5.default(facadeConfig), getStatements: memory_6.default(facadeConfig), getVoidersByObjectIds: memory_11.default(facadeConfig), getVoidersByIds: memory_10.default(facadeConfig), voidStatements: memory_15.default(facadeConfig), getDownRefId: memory_2.default(facadeConfig), getUpRefIds: memory_8.default(facadeConfig), setQueriables: memory_13.default(facadeConfig), getStatementsByIds: memory_7.default(facadeConfig), getUpRefsByIds: memory_9.default(facadeConfig), updateFullActivities: memory_14.default(facadeConfig), incrementStoreCount: memory_12.default(facadeConfig) });
});
