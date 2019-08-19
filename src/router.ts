import * as express from 'express';
import { traineeRouter, userRouter } from './controllers';
const router = express.Router();
router.use('/trainee', traineeRouter);
router.use('/user', userRouter);
export default router;
