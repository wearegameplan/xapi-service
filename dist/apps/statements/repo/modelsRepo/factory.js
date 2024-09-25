"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = __importDefault(require("./utils/memoryModels/factory"));
var factory_2 = __importDefault(require("./utils/mongoModels/factory"));
exports.default = (function (config) {
    switch (config.facade) {
        case 'mongo':
            return factory_2.default(config.mongo);
        default:
        case 'memory':
            return factory_1.default(config.memory);
    }
});
