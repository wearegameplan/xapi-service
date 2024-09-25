"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var fetch_1 = __importDefault(require("../../getClient/fetch"));
exports.default = (function (factoryConfig) {
    if (factoryConfig === void 0) { factoryConfig = {}; }
    var facadeConfig = {
        llClientInfoEndpoint: lodash_1.defaultTo(factoryConfig.llClientInfoEndpoint, "http://localhost/auth"),
    };
    return {
        getClient: fetch_1.default(facadeConfig),
    };
});
