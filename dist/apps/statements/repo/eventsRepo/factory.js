"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = __importDefault(require("./utils/fakeEvents/factory"));
var factory_2 = __importDefault(require("./utils/redisEvents/factory"));
var factory_3 = __importDefault(require("./utils/sentinel/factory"));
exports.default = (function (config) {
    switch (config.facade) {
        case 'test':
            return factory_1.default();
        case 'sentinel':
            return factory_3.default(config.sentinel);
        default:
        case 'redis':
            return factory_2.default(config.redis);
    }
});
