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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var storage_blob_1 = require("@azure/storage-blob");
var getAttachmentDir_1 = __importDefault(require("../../../utils/getAttachmentDir"));
var getAttachmentPath_1 = __importDefault(require("../../../utils/getAttachmentPath"));
var BYTES_IN_KILOBYTES = 1024;
var KILOBYTES_IN_MEGABYTES = 1024;
var FOUR = 4;
// https://github.com/Azure/azure-storage-js/blob/master/blob/samples/highlevel.sample.js
var BUFFER_SIZE = FOUR * KILOBYTES_IN_MEGABYTES * BYTES_IN_KILOBYTES; // 4MB
var MAX_BUFFERS = 20;
exports.default = (function (config) {
    return function (_a) {
        var lrs_id = _a.lrs_id, models = _a.models;
        return __awaiter(void 0, void 0, void 0, function () {
            var dir, promises;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dir = getAttachmentDir_1.default({ subFolder: config.subFolder, lrs_id: lrs_id });
                        promises = models.map(function (model) { return __awaiter(void 0, void 0, void 0, function () {
                            var filePath, blobUrl, blockBlobUrl;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        filePath = getAttachmentPath_1.default({
                                            dir: dir,
                                            hash: model.hash,
                                            contentType: model.contentType,
                                        });
                                        blobUrl = storage_blob_1.BlobURL.fromContainerURL(config.containerUrl, filePath);
                                        blockBlobUrl = storage_blob_1.BlockBlobURL.fromBlobURL(blobUrl);
                                        return [4 /*yield*/, storage_blob_1.uploadStreamToBlockBlob(storage_blob_1.Aborter.none, model.stream, blockBlobUrl, BUFFER_SIZE, MAX_BUFFERS)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
});
