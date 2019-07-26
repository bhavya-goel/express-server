import express = require ('express');
import { IConfig } from './config';
const app = express();
export class Server {
      constructor(private config: IConfig) {
      this.config = config;
   }
   public bootstrap() {
      this.setupRoutes();
      return this;
   }
   public setupRoutes() {
      app.get('/health-check', (req, res) => {
         res.send('I am OK');
      });
      this.run();
   }
   public run() {
      const {port} = this.config;
      app.listen(port, () => {
         console.log('server running');
      });
      return this;
   }
}
