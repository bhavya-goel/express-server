import { config } from 'dotenv';
import { IConfig } from './IConfig';
config();
const envar = process.env;
export const configuration: IConfig = Object.freeze({
    env: envar.NODE_ENV,
    port: envar.PORT,
});
