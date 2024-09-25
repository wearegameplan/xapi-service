"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var string_to_stream_1 = __importDefault(require("string-to-stream"));
var createSha_1 = __importDefault(require("./createSha"));
exports.default = (function (content, contentType) {
    if (contentType === void 0) { contentType = 'text/plain'; }
    return {
        stream: string_to_stream_1.default(content),
        hash: createSha_1.default(content),
        contentType: contentType,
        contentLength: content.length,
    };
});
