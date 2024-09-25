import { Request } from 'express';
import AttachmentModel from '../../models/AttachmentModel';
declare const _default: (req: Request<import("express-serve-static-core").ParamsDictionary>) => Promise<{
    body: any;
    attachments: AttachmentModel[];
}>;
export default _default;
