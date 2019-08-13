import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';
const userRepository = new UserRepository();
class TraineeRoutes {
    public get(request: Request, response: Response) {
        userRepository.getAll({role: 'trainee'}, {password: 0})
        .then((result) => {
            response.send({
                data: result,
                message: 'Successfully fetched trainees',
                status: 'OK',
            });
        });
    }
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
        .catch(() => {
            next({
                error: 'unauthorized access',
                message: 'Token not found',
                status: 403,
            });
        });
    }
    public update(request: Request, response: Response, next) {
        userRepository.update({
            _id: request.body.id,
        }, {
            ...request.body.dataToUpdate,
            userID: request.user._id,
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
        .catch(() => {
            next({
            error: 'Trainee not found',
            message: 'Enter correct ID',
            status: 403,
            });
        });
    }
    public delete(request: Request, response: Response, next) {
        userRepository.delete({_id: request.params.id}, request.user._id)
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
                    status: 403,
                });
            }
        });
    }
}
export const traineeRoutes = new TraineeRoutes();
