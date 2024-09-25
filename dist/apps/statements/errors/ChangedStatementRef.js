"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-class
var BaseError_1 = __importDefault(require("jscommons/dist/errors/BaseError"));
/* istanbul ignore next */
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1(statementId) {
        var _this = _super.call(this) || this;
        _this.statementId = statementId;
        return _this;
    }
    return default_1;
}(BaseError_1.default));
exports.default = default_1;
