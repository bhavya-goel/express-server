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
               status: 400,
            });
         }
         const { password: hashPassword} = user;
         if ( !bcrypt.compareSync(password, hashPassword)) {
            return next({
               error: 'password not matched',
               message: 'please provide correct pasword',
               status: 400,
            });
         }
         const token = jwt.sign(user, configuration.secretKey, { expiresIn: '15m' });
         res.send({
            data: token,
            message: 'User Login Successful',
            status: 200,
         });
      }
      catch (err) {
         return next({
            error: 'email not found',
            message: 'Login unsuccessful. Please try again',
            status: 400,
         });
      }
   }

// function which shows current user details

   public getUser(req, res) {
      res.send({
         data: req.user,
         message: 'User details fetched',
         status: 200,
      });
   }

   public async getUserwithID(req, res, next) {
     try {
      const { id } = req.params;
      const result = await userRepository.get({ originalID: id });
      if ( !result ) {
        throw new Error('user not found');
      }
      res.send({
        data: result,
        message: 'User Details Fetched',
        status: 200,
     });
     } catch (err) {
      return next({
        error: 'Bad Request',
        message: 'Provide correct ID',
        status: 400,
     });
     }
   }
}

export const userRoutes = new UserRoutes();
