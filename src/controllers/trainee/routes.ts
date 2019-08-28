import * as express from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import { traineeRoutes } from './Controller';
import { default as validation } from './validation';

const traineeRouter = express.Router();

traineeRouter.route('/')
    .get(
        authMiddleWare('getUsers', 'write'),
        validationHandler(validation.get),
        traineeRoutes.get,
    )
    .post(
        authMiddleWare('getUsers', 'write'),
        validationHandler(validation.create),
        traineeRoutes.create,
    )
    .put(
        authMiddleWare('getUsers', 'write'),
        validationHandler(validation.update),
        traineeRoutes.update,
    );

traineeRouter.route('/:id')
    .delete(
        authMiddleWare('getUsers', 'delete'),
        validationHandler(validation.delete),
        traineeRoutes.delete,
    );

export default traineeRouter;
