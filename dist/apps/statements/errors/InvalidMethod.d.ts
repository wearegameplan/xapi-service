import BaseError from 'jscommons/dist/errors/BaseError';
export default class extends BaseError {
    method?: string | undefined;
    constructor(method?: string | undefined);
}
