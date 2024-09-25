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
var s3_1 = __importDefault(require("aws-sdk/clients/s3"));
var s3Repo_1 = __importDefault(require("jscommons/dist/s3Repo"));
var lodash_1 = require("lodash");
var s3_2 = __importDefault(require("../../createAttachments/s3"));
var s3_3 = __importDefault(require("../../getAttachment/s3"));
exports.default = (function (factoryConfig) {
    if (factoryConfig === void 0) { factoryConfig = {}; }
    var facadeConfig = {
        client: new s3_1.default(__assign({ sslEnabled: true, apiVersion: '2006-03-01', signatureVersion: 'v4' }, factoryConfig.awsConfig)),
        bucketName: lodash_1.defaultTo(factoryConfig.bucketName, 'xapi-server'),
        subFolder: lodash_1.defaultTo(factoryConfig.subFolder, '/storage'),
    };
    return __assign(__assign({}, s3Repo_1.default(facadeConfig)), { createAttachments: s3_2.default(facadeConfig), getAttachment: s3_3.default(facadeConfig) });
});
