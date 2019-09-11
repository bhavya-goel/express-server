import { MongoMemoryServer } from 'mongodb-memory-server';
import { configuration } from '../config';
import { Database } from '../libs';
import { Server } from '../Server';
class Config {
  public app1;
  private mongoServer;
  constructor() {
    this.mongoServer = new MongoMemoryServer();
    const server = new Server(configuration);
    this.app1 = server.bootstrap();
  }

  public async start() {
    const url = await this.mongoServer.getConnectionString();
    await Database.open(url);
    return this.app1;
  }

  public close() {
    return this.mongoServer.stop();
  }
}

export default new Config();
