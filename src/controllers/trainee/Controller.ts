import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';

const userRepository = new UserRepository();

class TraineeRoutes {
// Function to fetch all trainees
    public async get(request: Request, response: Response) {
        const {skip , limit} = request.query;
        const count = await userRepository.count();
        userRepository.getAll({role: 'trainee'}, {password: 0}, { skip, limit})
        .then((result) => {
            response.send({
                data: {
                    count,
                    records: result,
                },
                message: 'Successfully fetched trainees',
                status: 'OK',
            });
        });
    }

// function to create new trainee
    public create(request: Request, response: Response, next) {
        const { email, password, name } = request.body;
        const data = {
            email,
            name,
            password,
        };
        userRepository.createWithHash(data, request.user._id)
        .then((result) => {
            response.send({
                data: result,
                message: 'Trainee Created Successfully',
                status: 'ok',
            });
        })
        .catch((err) => {
            next({
                error: 'Bad Request',
                message: err.message,
                status: 400,
            });
        });
    }

// function to update trainee
    public update(request: Request, response: Response, next) {
        const allowed = ['name', 'email', 'password'];
        const data = Object.keys(request.body.dataToUpdate)
        .filter((key) => allowed.includes(key))
        .reduce((obj, key) => {
            obj[key] = request.body.dataToUpdate[key];
            return obj;
        }, {});
        userRepository.update({
            originalID: request.body.id,
        }, {
            ...data,
            userID: request.user.originalID,
        })
        .then(() => {
            response.send({
                data: {
                    id: request.body.id,
                },
                message: 'Trainee Updated Successfully',
                status: 'OK',
            });
        })
        .catch((err) => {
            next({
            error: 'Bad Request',
            message: err || 'update unsuccessful',
            status: 400,
            });
        });
    }

// function to delete trainee
    public delete(request: Request, response: Response, next) {
        userRepository.delete({originalID: request.params.id}, request.user.originalID)
        .then((res) => {
            if (res) {
                response.send({
                    data: {
                        id: request.params.id,
                    },
                    message: 'Trainee Deleted Successfully',
                    status: 'OK',
                });
            }
            else {
                next({
                    error: 'Trainee not found',
                    message: 'Enter correct ID',
                    status: 400,
                });
            }
        });
    }
}

export const traineeRoutes = new TraineeRoutes();
