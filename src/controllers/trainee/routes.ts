import * as express from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import { traineeRoutes } from './Controller';
import { default as validation } from './validation';
const traineeRouter = express.Router();
traineeRouter.route('/')
                .get(validationHandler(validation.get), authMiddleWare('getUsers', 'read'), traineeRoutes.get)
                .post(validationHandler(validation.create), traineeRoutes.create)
                .put(validationHandler(validation.update), traineeRoutes.update);
traineeRouter.delete('/:id?', validationHandler(validation.delete), traineeRoutes.delete);
export default traineeRouter;
