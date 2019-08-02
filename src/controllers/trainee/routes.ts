import * as express from 'express';
import { traineeRoutes } from './Controller';
const traineeRouter = express.Router();
traineeRouter.route('/')
                .get(traineeRoutes.get)
                .post(traineeRoutes.create)
                .put(traineeRoutes.update)
                .delete(traineeRoutes.delete);
export default traineeRouter;
