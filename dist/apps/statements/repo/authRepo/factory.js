"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = __importDefault(require("./utils/fakeAuth/factory"));
var factory_2 = __importDefault(require("./utils/fetchAuth/factory"));
var factory_3 = __importDefault(require("./utils/mongoAuth/factory"));
exports.default = (function (config) {
    switch (config.facade) {
        case 'test':
            return factory_1.default(config.fake);
        case 'fetch':
            return factory_2.default(config.fetch);
        default:
        case 'mongo':
            return factory_3.default(config.mongo);
    }
});
