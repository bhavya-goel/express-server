import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { configuration } from '../../config';
import { UserRepository } from '../../repositories';

const userRepository = new UserRepository();
class UserRoutes {
   public login(req, res, next) {
      const { email, password} = req.body;
      userRepository.get({ email})
      .then((user) => {
         if ( !user ) {
            return next('User Not Found');
         }
         const { password: hashPassword} = user;
         if ( !bcrypt.compareSync(password, hashPassword)) {
            return next('password entered is wrong');
         }
         const token = jwt.sign(user, configuration.secretKey);
         res.send({
            data: {
               token,
            },
            message: 'login successful',
            status: 'ok',
         });
      })
      .catch((err) => {
         console.log('erorr', err);
      });
   }
   public getUser(req, res) {
      res.send(req.user);
   }
}
export const userRoutes = new UserRoutes();
