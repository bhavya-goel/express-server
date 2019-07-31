import * as bodyParser from 'body-parser';
import * as express from 'express';
import { IConfig } from './config';
import { errorHandlerMsg, routeNotFound } from './libs/routes/index';
export class Server {
   private app;
      constructor(private config: IConfig) {
      this.app = express();
   }
   public bootstrap() {
      this.initBodyParser();
      this.setupRoutes();
      return this;
   }
   public initBodyParser() {
      const { app } = this;
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended : false}));
   }
   public setupRoutes() {
      const { app } = this;
      app.use('/health-check', (req, res) => {
         res.send('I am OK');
      });
      app.use(routeNotFound);
      app.use(errorHandlerMsg);
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
