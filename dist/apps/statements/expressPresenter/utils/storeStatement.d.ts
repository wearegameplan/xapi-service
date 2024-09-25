import { Response } from 'express';
import AttachmentModel from '../../models/AttachmentModel';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';
export interface Options {
    readonly config: Config;
    readonly body: any;
    readonly attachments: AttachmentModel[];
    readonly client: ClientModel;
    readonly queryParams: any;
    readonly res: Response;
}
declare const _default: ({ config, body, attachments, client, queryParams, res }: Options) => Promise<void>;
export default _default;
