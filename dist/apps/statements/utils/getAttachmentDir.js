"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (opts) { return (opts.subFolder !== undefined
    ? opts.subFolder + "/" + opts.lrs_id + "/attachments"
    : opts.lrs_id + "/attachments"); });
