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
         const { password: hashPassword} = user[0];
         if ( !bcrypt.compareSync(password, hashPassword)) {
            return next('password entered is wrong');
         }
         const token = jwt.sign(user[0], configuration.secretKey, { expiresIn: '15m' });
         res.send({
            data: {
               token,
               user,
            },
            message: 'login successful',
            status: 'ok',
         });
      })
      .catch((err) => {
         console.log('erorr', err);
      });
   }
   public getAllUsers(req, res) {
      userRepository.get({}).then((user) => {
         res.send(user);
      });
   }
   public getUser(req, res) {
      res.send(req.user);
   }
   public deleteUser(req, res) {
      userRepository.delete({
         _id: req.params.id,
      }, {
         userID: 'user',
      }).then((user) => {
         res.send(user);
      });
   }
   public updateUser(req, res) {
      userRepository.update({
         _id: req.body.id,
      }, req.body.dataToUpdate).then((user) => {
         res.send(user);
      });
   }
}
export const userRoutes = new UserRoutes();
