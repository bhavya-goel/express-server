import * as express from 'express';
import { traineeRouter } from './controllers';
const router = express.Router();
router.use('/trainee', traineeRouter);
export default router;
