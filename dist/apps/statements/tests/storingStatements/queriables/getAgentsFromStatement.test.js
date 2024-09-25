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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var getAgentsFromStatement_1 = require("../../../service/storeStatements/queriables/getAgentsFromStatement");
var ACTIVITY_ID = 'http://example.org/test-activity';
var activity = {
    objectType: 'Activity',
    id: ACTIVITY_ID,
};
var statementDefaults = {
    id: 'testvalue',
    authority: {
        objectType: 'Agent',
        mbox: 'mailto:authority@test.com',
    },
    stored: 'testvalue',
    timestamp: 'testvalue',
    version: 'testvalue',
    actor: {
        objectType: 'Agent',
        mbox: 'mailto:actor@test.com',
    },
    object: activity,
    verb: {
        id: 'http://example.org/verb',
    },
};
var agentObjectModel = __assign(__assign({}, statementDefaults), { object: {
        objectType: 'Agent',
        mbox: 'mailto:objectagent@test.com',
    } });
var activityObjectModel = __assign(__assign({}, statementDefaults), { object: activity, context: {
        team: {
            objectType: 'Group',
            mbox: 'mailto:team@test.com',
            member: [
                { objectType: 'Agent', mbox: 'mailto:teammember@test.com' },
            ],
        },
        instructor: {
            objectType: 'Agent',
            mbox: 'mailto:instructor@test.com',
        },
    } });
var subStatementObjectModel = __assign(__assign({}, statementDefaults), { object: {
        objectType: 'SubStatement',
        actor: {
            objectType: 'Agent',
            mbox: 'mailto:ssactor@test.com',
        },
        verb: {
            id: 'http://example.org/verb',
        },
        object: activity,
        context: activityObjectModel.context,
    }, context: {
        team: {
            objectType: 'Group',
            mbox: 'mailto:ssteam@test.com',
            member: [
                { objectType: 'Agent', mbox: 'mailto:ssteammember@test.com' },
            ],
        },
        instructor: {
            objectType: 'Agent',
            mbox: 'mailto:ssinstructor@test.com',
        },
    } });
describe('create array of queriable agents', function () {
    it('should return the non related agents', function () {
        var idents = getAgentsFromStatement_1.getAgentsFromStatement(agentObjectModel);
        var agentObj = agentObjectModel.object;
        assert_1.default.deepEqual(idents, [
            agentObjectModel.actor.mbox,
            agentObj.mbox,
        ]);
    });
    it('should return the related activities', function () {
        var idents = getAgentsFromStatement_1.getRelatedAgentsFromStatement(activityObjectModel);
        var context = activityObjectModel.context;
        var team = context.team;
        var member = team.member;
        var instructor = context.instructor;
        assert_1.default.deepEqual(idents, __spreadArrays([
            activityObjectModel.actor.mbox,
            team.mbox
        ], member.map(function (m) { return m.mbox; }), [
            instructor.mbox,
            activityObjectModel.authority.mbox,
        ]));
    });
    it('should return the related activities with a substatement', function () {
        var idents = getAgentsFromStatement_1.getRelatedAgentsFromStatement(subStatementObjectModel);
        var context = subStatementObjectModel.context;
        var team = context.team;
        var member = team.member;
        var instructor = context.instructor;
        var ssobject = subStatementObjectModel.object;
        var sscontext = ssobject.context;
        var ssteam = sscontext.team;
        var ssmember = ssteam.member;
        var ssinstructor = sscontext.instructor;
        assert_1.default.deepEqual(idents, __spreadArrays([
            subStatementObjectModel.actor.mbox,
            team.mbox
        ], member.map(function (m) { return m.mbox; }), [
            instructor.mbox,
            subStatementObjectModel.authority.mbox,
            ssobject.actor.mbox,
            ssteam.mbox
        ], ssmember.map(function (m) { return m.mbox; }), [
            ssinstructor.mbox,
        ]));
    });
    // tslint:disable-next-line:max-file-line-count
});
