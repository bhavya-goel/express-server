import * as express from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import { traineeRoutes } from './Controller';
import { default as validation } from './validation';
const traineeRouter = express.Router();
traineeRouter.route('/:id?')
                .get(validationHandler(validation.get), authMiddleWare('getUsers', 'read'), traineeRoutes.get)
                .post(validationHandler(validation.create), traineeRoutes.create)
                .put(validationHandler(validation.update), traineeRoutes.update)
                .delete(validationHandler(validation.delete), traineeRoutes.delete);
// traineeRouter.delete('/:id?', validationHandler(validation.delete), traineeRoutes.delete);
export default traineeRouter;
