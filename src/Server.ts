import express from 'express';
import { IConfig } from './config'
const app = express();
export class server {
      constructor(private config: IConfig){
      this.config = config;
   }
   
   bootstrap(){
      this.setupRoutes()
      return this
   }
   setupRoutes(){
      
      app.get('/health-check', function(req, res){
         res.send('I am OK'); 
      });
      this.run()  
   }
   run(){
      let {port} = this.config;
      app.listen(port,() => {
         console.log("server running");
      })
      return this;
   }
   

}
 