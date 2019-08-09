import * as express from 'express';
import { authMiddleWare, validationHandler } from '../../libs';
import { userRoutes } from './Controller';
// import { default as validation } from './validation';
const userRouter = express.Router();
userRouter.route('/login')
                .post(userRoutes.login);
userRouter.route('/me')
                .get(authMiddleWare('getUsers', 'read'), userRoutes.getUser);
export default userRouter;
