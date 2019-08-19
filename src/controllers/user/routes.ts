import * as express from 'express';
// import { authMiddleWare, validationHandler } from '../../libs';
import { userRoutes } from './Controller';
// import { default as validation } from './validation';
const userRouter = express.Router();
userRouter.route('/:id?')
                .get(userRoutes.get)
                .post(userRoutes.create)
                .put(userRoutes.update)
                .delete(userRoutes.delete);
export default userRouter;
