import * as express from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import { userRoutes } from './Controller';
import { default as validation } from './validation';

const userRouter = express.Router();

userRouter.route('/login')
                .post(
                    validationHandler(validation.create),
                    userRoutes.login,
                    );

userRouter.route('/me')
                .get(
                    authMiddleWare('getUsers', 'read'),
                    validationHandler(validation.get),
                    userRoutes.getUser,
                );
userRouter.route('/me/:id')
                .get(
                    authMiddleWare('getUsers', 'read'),
                    validationHandler(validation.get),
                    userRoutes.getUserwithID,
                );

export default userRouter;
