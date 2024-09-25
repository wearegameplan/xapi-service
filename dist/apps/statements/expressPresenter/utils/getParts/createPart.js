"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var string_to_stream_1 = __importDefault(require("string-to-stream"));
var parseHeaders_1 = __importDefault(require("./parseHeaders"));
var trimmedChars = "\r\ns";
var headerBoundary = /\n{2}|(\r\n){2}/;
exports.default = (function (streamPart) {
    var boundaryIndex = streamPart.search(headerBoundary);
    var hasBoundaryIndex = boundaryIndex !== -1;
    var partLength = streamPart.length;
    var unparsedHeaders = streamPart.slice(0, hasBoundaryIndex ? boundaryIndex : partLength);
    var content = streamPart.slice(hasBoundaryIndex ? boundaryIndex : partLength);
    var trimmedContent = lodash_1.trimStart(content, trimmedChars);
    var stream = string_to_stream_1.default(trimmedContent);
    var headers = parseHeaders_1.default(unparsedHeaders);
    return { stream: stream, headers: headers };
});
