import { Request, Response } from 'express';
class TraineeRoutes {
    public get(request: Request, response: Response) {
        response.send({
            id: 1,
            name: 'Trainee1',
        });
    }
    public post(request: Request, response: Response) {
        response.send({
            data: 'trainee added',
            id: 1,
            name: 'Trainee1',
        });
    }
    public put(request: Request, response: Response) {
        response.send({
            data: 'trainee updated',
            id: 1,
            name: 'Trainee1',
        });
    }
    public delete(request: Request, response: Response) {
        response.send({
            data: 'trainee deleted',
            id: 1,
            name: 'Trainee1',
        });
    }
}
export const traineeRoutes = new TraineeRoutes();
