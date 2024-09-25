"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = __importStar(require("assert"));
var rulr_1 = require("rulr");
var validateAgent_1 = __importDefault(require("../../utils/validateAgent"));
describe('validateAgent', function () {
    var assertWarnings = function (agent) {
        try {
            validateAgent_1.default(agent);
        }
        catch (err) {
            var actualConstructor = err.constructor;
            assert.equal(actualConstructor, rulr_1.Warnings);
        }
    };
    it('should throw an error when using an invalid mbox value', function () {
        assertWarnings({ mbox: 'test@example.org' });
    });
    it('should throw an error when using an invalid mbox_sha1sum value', function () {
        assertWarnings({ mbox_sha1sum: 'test@example.org' });
    });
    it('should throw an error when using an invalid openid value', function () {
        assertWarnings({ openid: 'www.example.org' });
    });
    it('should throw an error when using an invalid homePage value', function () {
        assertWarnings({ account: {
                homePage: 'www.example.org',
                name: 'dummy_account_name',
            } });
    });
    it('should throw an error when using an invalid name type', function () {
        assertWarnings({ account: {
                homePage: 'http://www.example.org',
                name: 10,
            } });
    });
    it('should throw an error when using an invalid homePage value and name type', function () {
        assertWarnings({ account: {
                homePage: 'www.example.org',
                name: 10,
            } });
    });
    it('should throw an error when using an invalid mbox type', function () {
        assertWarnings({ mbox: 10 });
    });
    it('should throw an error when using an invalid mbox_sha1sum type', function () {
        assertWarnings({ mbox_sha1sum: 10 });
    });
    it('should throw an error when using an invalid openid type', function () {
        assertWarnings({ openid: 10 });
    });
    it('should throw an error when using an invalid homePage type', function () {
        assertWarnings({ account: {
                homePage: 10,
                name: 'dummy_account_name',
            } });
    });
    it('should throw an error when using an invalid homePage type and name type', function () {
        assertWarnings({ account: {
                homePage: 10,
                name: 10,
            } });
    });
    it('should throw an error when using too many IFIs', function () {
        assertWarnings({
            mbox: 'mailto:test@example.org',
            openid: 'http://www.example.org',
        });
    });
    it('should throw an error when using no IFIs', function () {
        assertWarnings({});
    });
    it('should throw an error when using an invalid IFI', function () {
        assertWarnings({ foo: 'bar' });
    });
});
