"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var memoryModelsRepo_1 = __importDefault(require("../../memoryModelsRepo"));
var mongoModelsRepo_1 = __importDefault(require("../../mongoModelsRepo"));
exports.default = (function (factoryConfig) {
    switch (factoryConfig.factoryName) {
        case 'mongo':
            return mongoModelsRepo_1.default(factoryConfig.mongo);
        default:
        case 'memory':
            return memoryModelsRepo_1.default(factoryConfig.memory);
    }
});
