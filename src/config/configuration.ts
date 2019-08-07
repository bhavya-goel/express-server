import { config } from 'dotenv';
import { IConfig } from './IConfig';
config();
const envar = process.env;
export const configuration: IConfig = Object.freeze({
    mongoUri: envar.MONGO_URL,
    port: envar.PORT,
    secretKey: envar.SECRET_KEY,
});
