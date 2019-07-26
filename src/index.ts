import { configuration, IConfig } from './config';
import { server } from './Server';
let server1 = new server(configuration);
server1.bootstrap();