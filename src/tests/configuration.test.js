import { config } from "dotenv";
import { Server } from "../Server";
config();
const envar = process.env.test;
const configuration = Object.freeze({
    mongoUri: envar.MONGO_URL,
    password: envar.PASSWORD,
    port: envar.PORT,
    secretKey: envar.SECRET_KEY,
});
const server = new Server(configuration);
server.bootstrap();
