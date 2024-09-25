"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../../../config"));
var factory_1 = __importDefault(require("./factory"));
var connectToMongoDb_1 = __importDefault(require("./utils/connectToMongoDb"));
var connectToRedis_1 = __importDefault(require("./utils/connectToRedis"));
var connectToSentinel_1 = __importDefault(require("./utils/connectToSentinel"));
var repo = factory_1.default({
    auth: {
        facade: config_1.default.repoFactory.authRepoName,
        fake: {},
        fetch: {
            llClientInfoEndpoint: config_1.default.fetchAuthRepo.llClientInfoEndpoint,
        },
        mongo: {
            db: connectToMongoDb_1.default(),
        },
    },
    events: {
        facade: config_1.default.repoFactory.eventsRepoName,
        redis: {
            client: connectToRedis_1.default(),
            prefix: config_1.default.redis.prefix,
        },
        sentinel: {
            client: connectToSentinel_1.default(),
            prefix: config_1.default.sentinel.prefix,
        },
    },
    models: {
        facade: config_1.default.repoFactory.modelsRepoName,
        memory: {
            state: {
                fullActivities: [],
                statements: [],
            },
        },
        mongo: {
            db: connectToMongoDb_1.default(),
        },
    },
    storage: {
        facade: config_1.default.repoFactory.storageRepoName,
        local: {
            storageDir: config_1.default.localStorageRepo.storageDir,
        },
        s3: {
            awsConfig: config_1.default.s3StorageRepo.awsConfig,
            bucketName: config_1.default.s3StorageRepo.bucketName,
            subFolder: config_1.default.storageSubFolders.statements,
        },
        google: {
            bucketName: config_1.default.googleStorageRepo.bucketName,
            keyFileName: config_1.default.googleStorageRepo.keyFileName,
            projectId: config_1.default.googleStorageRepo.projectId,
            subFolder: config_1.default.googleStorageRepo.subFolder,
        },
        azure: {
            account: config_1.default.azureStorageRepo.account,
            accountKey: config_1.default.azureStorageRepo.accountKey,
            containerName: config_1.default.azureStorageRepo.containerName,
            subFolder: config_1.default.azureStorageRepo.subFolder,
        },
    },
});
exports.default = repo;
