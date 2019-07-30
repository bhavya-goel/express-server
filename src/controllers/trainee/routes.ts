import * as express from 'express';
import { traineeRoutes } from './Controller';
const traineeRouter = express.Router();
traineeRouter.route('/')
                .get(traineeRoutes.get)
                .post(traineeRoutes.post)
                .put(traineeRoutes.put)
                .delete(traineeRoutes.delete);
export default traineeRouter;
