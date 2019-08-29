import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';

const userRepository = new UserRepository();

class TraineeRoutes {
// Function to fetch all trainees
    public async get(request: Request, response: Response, next) {
        try {
            const {skip , limit} = request.query;
            const count = await userRepository.count();
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
    public async create(request: Request, response: Response, next) {
        try {
            const { email, password, name } = request.body;
            const data = {
                email,
                name,
                password,
            };
            const result = await userRepository.createWithHash(data, request.user._id);
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
    public async update(request: Request, response: Response, next) {
        try {
            const allowed = ['name', 'email', 'password'];
            const data = Object.keys(request.body.dataToUpdate)
            .filter((key) => allowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = request.body.dataToUpdate[key];
                return obj;
            }, {});
            await userRepository.update({
                originalID: request.body.id,
            }, {
                ...data,
                userID: request.user.originalID,
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
                message: err || 'update unsuccessful',
                status: 400,
            });
        }
    }

// function to delete trainee
    public async delete(request: Request, response: Response, next) {
        try {
            const result = await userRepository.delete({originalID: request.params.id}, request.user.originalID);
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
                error: 'Trainee not found',
                message: err.message || 'Enter correct ID',
                status: 400,
            });
        }
    }
}

export const traineeRoutes = new TraineeRoutes();
