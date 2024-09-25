import BaseError from 'jscommons/dist/errors/BaseError';
import Statement from '../models/Statement';
export default class extends BaseError {
    originalStatement: Statement;
    decodedStatement: unknown;
    constructor(originalStatement: Statement, decodedStatement: unknown);
}
