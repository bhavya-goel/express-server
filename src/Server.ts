import * as express from 'express';
import { IConfig } from './config';
export class Server {
   private app = express();
   private config: IConfig;
      constructor(config: IConfig) {
      this.config = config;
   }
   public bootstrap() {
      this.setupRoutes();
      return this;
   }
   public setupRoutes() {
      this.app.get('/health-check', (req, res) => {
         res.send('I am OK');
      });
      this.run();
   }
   public run() {
      const {config: { port}} = this;
      this.app.listen(port, () => {
         console.log('server running');
      });
      return this;
   }
}
