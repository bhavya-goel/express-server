import * as express from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import { userRoutes } from './Controller';
import { default as validation } from './validation';
const userRouter = express.Router();
userRouter.route('/login')
                .post(userRoutes.login);
userRouter.route('/')
                .get(validationHandler(
                    validation.get),
                    authMiddleWare('getUsers', 'all'),
                    userRoutes.getAllUsers,
                );
userRouter.route('/me')
                .get(
                    validationHandler(validation.get),
                    authMiddleWare('getUsers', 'read'),
                    userRoutes.getUser,
                )
                .put(
                    validationHandler(validation.update),
                    authMiddleWare('getUsers', 'write'),
                    userRoutes.updateUser,
                    );
userRouter.route('/me/:id?')
                .delete(
                    validationHandler(validation.delete),
                    authMiddleWare('getUsers', 'delete'),
                    userRoutes.deleteUser,
                    );
export default userRouter;
