import * as express from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import { traineeRoutes } from './Controller';
import { default as validation } from './validation';

const traineeRouter = express.Router();

traineeRouter.route('/')

    .get(
        validationHandler(validation.get),
        authMiddleWare('getUsers', 'read'),
        traineeRoutes.get,
    )
    .post(
        validationHandler(validation.create),
        authMiddleWare('getUsers', 'write'),
        traineeRoutes.create,
    )
    .put(
        validationHandler(validation.update),
        authMiddleWare('getUsers', 'write'),
        traineeRoutes.update,
    );

traineeRouter.route('/:id')
    .delete(
        validationHandler(validation.delete),
        authMiddleWare('getUsers', 'delete'),
        traineeRoutes.delete,
    );
export default traineeRouter;
