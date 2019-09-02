import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';
import { IQueryGet, IQueryPost, IQueryPut } from '../../repositories/QueryInterface';

const userRepository = new UserRepository();

class TraineeRoutes {
// Function to fetch all trainees
    public async get(request: Request, response: Response, next) {
        try {
            const {skip , limit} = request.query as IQueryGet;
            const count = await userRepository.count({ role: 'trainee' });
            const result = await userRepository.getAll({ role: 'trainee' }, {password: 0}, { skip, limit});
            response.send({
                data: {
                    count,
                    records: result,
                },
                message: 'Successfully fetched trainees',
                status: 'OK',
            });
        }
        catch (err) {
            next({
                error: 'Bad Request',
                message: err.message || 'Could not fetch data',
                status: 400,
            });
        }

    }

// function to create new trainee
    public create = async (request: Request, response: Response, next) => {
        try {
            const { email, password, name } = request.body as IQueryPost;
            const hash = this.createHash(password);
            const data = {
                email,
                name,
                password: hash,
            };
            const result = await userRepository.create(data, request.user._id);
            response.send({
                data: result,
                message: 'Trainee Created Successfully',
                status: 'ok',
            });
        }
        catch (err) {
            next({
                error: 'Bad Request',
                message: err.message,
                status: 400,
            });
        }
    }

// function to update trainee
    public update = async (request: Request, response: Response, next) => {
        try {
            const { body: { dataToUpdate, id }, user: { originalID } } = request;
            if ('password' in dataToUpdate) {
                dataToUpdate.password = this.createHash(dataToUpdate.password);
            }
            const allowed = ['name', 'email', 'password'];
            const data: IQueryPut = Object.keys(dataToUpdate)
            .filter((key) => allowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = dataToUpdate[key];
                return obj;
            }, {});
            await userRepository.update({
                originalID: id,
            }, {
                ...data,
                userID: originalID,
            });
            response.send({
                data: {
                    id: request.body.id,
                },
                message: 'Trainee Updated Successfully',
                status: 'OK',
            });
        }
        catch (err) {
            next({
                error: 'Bad Request',
                message: err.message || 'update unsuccessful',
                status: 400,
            });
        }
    }

// function to delete trainee
    public async delete(request: Request, response: Response, next) {
        try {
            const { params: { id }, user: { originalID } } = request;
            await userRepository.delete({ originalID: id }, originalID);
            response.send({
                data: {
                    id: request.params.id,
                },
                message: 'Trainee Deleted Successfully',
                status: 'OK',
            });
        }
        catch (err) {
            next({
                error: 'Bad Request',
                message: err.message || 'Enter correct ID',
                status: 400,
            });
        }
    }

    public createHash = (password) => {
        const saltCount = 10;
        const salt = bcrypt.genSaltSync(saltCount);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }
}

export const traineeRoutes = new TraineeRoutes();
