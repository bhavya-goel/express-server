import express = require ('express');
import { IConfig } from './config';
const app = express();
export class Server {

   private config: IConfig;
      constructor(config: IConfig) {
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
      const {config: { port}} = this;
      app.listen(port, () => {
         console.log('server running');
      });
      return this;
   }
}
