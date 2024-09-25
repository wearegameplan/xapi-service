"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var url_1 = require("url");
exports.default = (function (req) { return lodash_1.defaultTo(url_1.parse(req.originalUrl).pathname, '/'); });
