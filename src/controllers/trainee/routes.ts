import * as express from 'express';
import { traineeRoutes } from './Controller';
import { validationHandler } from '../../libs';
import { default as validation } from './validation';
const traineeRouter = express.Router();
traineeRouter.route('/')
                .get(validationHandler(validation.get), traineeRoutes.get)
                .post(validationHandler(validation.create), traineeRoutes.create)
                .put(validationHandler(validation.update), traineeRoutes.update);
                // .delete(validationHandler(validation.delete), traineeRoutes.delete);
traineeRouter.delete('/:id?', validationHandler(validation.delete), traineeRoutes.delete);
export default traineeRouter;
