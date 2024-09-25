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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var query_string_1 = require("query-string");
var stream_to_string_1 = __importDefault(require("stream-to-string"));
var string_to_stream_1 = __importDefault(require("string-to-stream"));
var InvalidMethod_1 = __importDefault(require("../../errors/InvalidMethod"));
var deleteProfileWithService_1 = __importDefault(require("./deleteProfileWithService"));
var getWithService_1 = __importDefault(require("./getWithService"));
var overwriteProfileWithService_1 = __importDefault(require("./overwriteProfileWithService"));
var patchProfileWithService_1 = __importDefault(require("./patchProfileWithService"));
var getQuery = function (stream) { return __awaiter(void 0, void 0, void 0, function () {
    var body, decodedBody;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, stream_to_string_1.default(stream)];
            case 1:
                body = _a.sent();
                decodedBody = query_string_1.parse(body);
                return [2 /*return*/, decodedBody];
        }
    });
}); };
var getHeaders = function (bodyParams, req) {
    var reqHeaders = req.headers;
    var lowerCaseBodyParams = lodash_1.mapKeys(bodyParams, function (_value, key) {
        return key.toLowerCase();
    });
    return __assign(__assign({}, reqHeaders), lowerCaseBodyParams);
};
exports.default = (function (_a) {
    var config = _a.config, method = _a.method, req = _a.req, res = _a.res;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, query, headers, content, query, headers, query, headers, content, query, headers;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = method;
                    switch (_b) {
                        case 'POST': return [3 /*break*/, 1];
                        case 'GET': return [3 /*break*/, 3];
                        case 'PUT': return [3 /*break*/, 5];
                        case 'DELETE': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 1: return [4 /*yield*/, getQuery(req)];
                case 2:
                    query = _c.sent();
                    headers = getHeaders(query, req);
                    content = string_to_stream_1.default(lodash_1.get(query, 'content', ''));
                    return [2 /*return*/, patchProfileWithService_1.default({ query: query, headers: headers, content: content, config: config, res: res })];
                case 3: return [4 /*yield*/, getQuery(req)];
                case 4:
                    query = _c.sent();
                    headers = getHeaders(query, req);
                    return [2 /*return*/, getWithService_1.default({ config: config, headers: headers, query: query, res: res })];
                case 5: return [4 /*yield*/, getQuery(req)];
                case 6:
                    query = _c.sent();
                    headers = getHeaders(query, req);
                    content = string_to_stream_1.default(lodash_1.get(query, 'content', ''));
                    return [2 /*return*/, overwriteProfileWithService_1.default({ query: query, headers: headers, content: content, config: config, res: res })];
                case 7: return [4 /*yield*/, getQuery(req)];
                case 8:
                    query = _c.sent();
                    headers = getHeaders(query, req);
                    return [2 /*return*/, deleteProfileWithService_1.default({ config: config, headers: headers, query: query, res: res })];
                case 9:
                    {
                        throw new InvalidMethod_1.default(method);
                    }
                    _c.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
});
