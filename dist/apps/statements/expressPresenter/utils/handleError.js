"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
var handleError_1 = __importDefault(require("jscommons/dist/expressPresenter/utils/handleError"));
var sendMessage_1 = __importDefault(require("jscommons/dist/expressPresenter/utils/sendMessage"));
var sendObject_1 = __importDefault(require("jscommons/dist/expressPresenter/utils/sendObject"));
var ChangedStatementRef_1 = __importDefault(require("../../errors/ChangedStatementRef"));
var Conflict_1 = __importDefault(require("../../errors/Conflict"));
var DataBeforeFirstBoundary_1 = __importDefault(require("../../errors/DataBeforeFirstBoundary"));
var DataBeyondFinalBoundary_1 = __importDefault(require("../../errors/DataBeyondFinalBoundary"));
var DuplicateId_1 = __importDefault(require("../../errors/DuplicateId"));
var ExpiredClientError_1 = __importDefault(require("../../errors/ExpiredClientError"));
var ExtraAttachments_1 = __importDefault(require("../../errors/ExtraAttachments"));
var InvalidBoundary_1 = __importDefault(require("../../errors/InvalidBoundary"));
var InvalidContentTransferEncoding_1 = __importDefault(require("../../errors/InvalidContentTransferEncoding"));
var InvalidContentType_1 = __importDefault(require("../../errors/InvalidContentType"));
var InvalidJws_1 = __importDefault(require("../../errors/InvalidJws"));
var InvalidMethod_1 = __importDefault(require("../../errors/InvalidMethod"));
var InvalidSignatureAlgorithm_1 = __importDefault(require("../../errors/InvalidSignatureAlgorithm"));
var InvalidSignedStatement_1 = __importDefault(require("../../errors/InvalidSignedStatement"));
var InvalidVoidType_1 = __importDefault(require("../../errors/InvalidVoidType"));
var InvalidX5CChain_1 = __importDefault(require("../../errors/InvalidX5CChain"));
var InvalidX5CType_1 = __importDefault(require("../../errors/InvalidX5CType"));
var JsonSyntaxError_1 = __importDefault(require("../../errors/JsonSyntaxError"));
var MissingAttachments_1 = __importDefault(require("../../errors/MissingAttachments"));
var MissingLoadedId_1 = __importDefault(require("../../errors/MissingLoadedId"));
var MissingStatementId_1 = __importDefault(require("../../errors/MissingStatementId"));
var NoStatements_1 = __importDefault(require("../../errors/NoStatements"));
var QueryIds_1 = __importDefault(require("../../errors/QueryIds"));
var UnequalStatementId_1 = __importDefault(require("../../errors/UnequalStatementId"));
var UnknownParams_1 = __importDefault(require("../../errors/UnknownParams"));
var UntrustedClientError_1 = __importDefault(require("../../errors/UntrustedClientError"));
var VoidingError_1 = __importDefault(require("../../errors/VoidingError"));
var constants_1 = require("../../utils/constants");
// tslint:disable-next-line:cyclomatic-complexity
exports.default = (function (_a) {
    var config = _a.config, errorId = _a.errorId, res = _a.res, err = _a.err;
    var logger = config.logger, translator = config.translator;
    var logError = function (msg, meta) {
        logger.error(errorId + ": xapi-statements handled - " + msg, meta);
    };
    var timestamp = new Date().toISOString();
    res.setHeader('X-Experience-API-Consistent-Through', timestamp);
    res.setHeader('X-Experience-API-Version', constants_1.xapiHeaderVersion);
    if (err instanceof InvalidSignatureAlgorithm_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.invalidSignatureAlgorithmError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof InvalidX5CType_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.invalidX5CTypeError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof InvalidX5CChain_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.invalidX5CChainError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof InvalidJws_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.invalidJwsError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof InvalidSignedStatement_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.invalidSignedStatementError(err);
        var obj = { message: message, statement: err.originalStatement };
        logError(message);
        return sendObject_1.default({ res: res, code: code, errorId: errorId, obj: obj });
    }
    if (err instanceof JsonSyntaxError_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.jsonSyntaxError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof ChangedStatementRef_1.default) {
        var code = http_status_codes_1.INTERNAL_SERVER_ERROR;
        var message = translator.changedStatementRefError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof Conflict_1.default) {
        var code = 409;
        var message = translator.conflictError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof DataBeforeFirstBoundary_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.dataBeforeFirstBoundaryError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof DataBeyondFinalBoundary_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.dataBeyondFinalBoundaryError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof DuplicateId_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.duplicateIdError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof ExtraAttachments_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.extraAttachmentsError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof InvalidBoundary_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.invalidBoundaryError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof InvalidContentType_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.invalidContentTypeError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof InvalidContentTransferEncoding_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.invalidContentTransferEncodingError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof InvalidMethod_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.invalidMethodError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof InvalidVoidType_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.invalidVoidTypeError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof MissingAttachments_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.missingAttachmentsError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof MissingLoadedId_1.default) {
        var code = http_status_codes_1.INTERNAL_SERVER_ERROR;
        var message = translator.missingLoadedIdError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof MissingStatementId_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.missingStatementIdError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof NoStatements_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.noStatementsError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof QueryIds_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.queryIdsError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof UnknownParams_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.unknownParamsError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof UnequalStatementId_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.unequalStatementIdError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof VoidingError_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.voidingErrorError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof ExpiredClientError_1.default) {
        var code = http_status_codes_1.FORBIDDEN;
        var message = translator.expiredClientError(err);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof UntrustedClientError_1.default) {
        var code = http_status_codes_1.FORBIDDEN;
        var message = translator.untrustedClientError(err);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    return handleError_1.default({ config: config, errorId: errorId, res: res, err: err });
    // tslint:disable-next-line:max-file-line-count
});
