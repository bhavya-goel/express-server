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
            return next({
               error: 'email not found',
               message: 'Please sign up before login or provide correct email',
               status: '400',
            });
         }
         const { password: hashPassword} = user;
         if ( !bcrypt.compareSync(password, hashPassword)) {
            return next({
               error: 'password not matched',
               message: 'please provide correct pasword',
               status: '400',
            });
         }
         const token = jwt.sign(user, configuration.secretKey, { expiresIn: '15m' });
         res.send({
            data: token,
            message: 'Authorization Token',
            status: 'ok',
         });
      })
      .catch((err) => {
         console.log('erorr', err);
      });
   }
   public getUser(req, res) {
      res.send({
         data: req.user,
         message: 'ME',
         status: 'OK',
      });
   }
}
export const userRoutes = new UserRoutes();
