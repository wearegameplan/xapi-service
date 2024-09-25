import { Response } from 'express';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';
export interface Options {
    readonly config: Config;
    readonly client: ClientModel;
    readonly body: any;
    readonly attachments: any[];
    readonly res: Response;
}
declare const _default: ({ config, client, body, attachments, res }: Options) => Promise<void>;
export default _default;
