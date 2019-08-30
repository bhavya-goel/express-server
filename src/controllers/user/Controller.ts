import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { configuration } from '../../config';
import { UserRepository } from '../../repositories';
import { IQueryLogin } from '../../repositories/QueryInterface';

const userRepository = new UserRepository();

class UserRoutes {

// function which checks email and password for login

   public async login(req, res, next) {
      try {
         const { email, password} = req.body as IQueryLogin;
         const user = await userRepository.get({ email});
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
      }
      catch (err) {
         return next({
            error: 'email not found',
            message: err.message || 'Please sign up before login or provide correct email',
            status: '400',
         });
      }
   }

// function which shows current user details

   public getUser(req, res) {
      res.send({
         data: req.user,
         message: 'User details fetched',
         status: 'OK',
      });
   }
}

export const userRoutes = new UserRoutes();
