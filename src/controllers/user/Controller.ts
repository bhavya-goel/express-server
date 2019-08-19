import { Request, Response } from 'express';
class UserRoutes {
    public get(request: Request, response: Response) {
        response.send({
            id: 1,
            name: 'User1',
        });
    }
    public create(request: Request, response: Response) {
        response.send({
            data: 'user added',
            id: 1,
            name: 'User1',
        });
    }
    public update(request: Request, response: Response) {
        response.send({
            data: 'user updated',
            id: 1,
            name: 'user1',
        });
    }
    public delete(request: Request, response: Response) {
        response.send({
            data: 'user deleted',
            id: 1,
            name: 'user',
        });
    }
}
export const userRoutes = new UserRoutes();
