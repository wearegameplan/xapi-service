import { Request } from 'express';
declare const getHeader: (req: Request<import("express-serve-static-core").ParamsDictionary>, name: string, defaultVal?: any) => string;
export default getHeader;
