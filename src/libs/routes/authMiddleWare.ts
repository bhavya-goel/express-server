import * as jwt from 'jsonwebtoken';
import { hasPermissions } from '../../../extraTs/utils';
import { configuration } from '../../config';
import { UserRepository } from '../../repositories';

const userRepository = new UserRepository();

export default (moduleName, permissionType) => async (req, res, next) => {

    try {

        const authorization = 'authorization';
        const token = req.headers[authorization];
        const key = configuration.secretKey;
        const info = jwt.verify(token, key);

        // to validate the token
        const user = await userRepository.get({ originalID: info.originalID}, { password : 0});
        if (!user) {
            return next({
                error: 'Forbidden',
                message: 'Authentication failed',
                status: 401,
            });
        }

        // to check user's authorization
        if (hasPermissions(moduleName, user.role, permissionType)) {
            req.user = user;
            next();
        }
        else {
            return next({
                error: 'unauthorized',
                message: `${info.role} doesn't has ${permissionType} access`,
                status: 403,
            });
        }
    } catch (err) {
        return next({
            error: 'Forbidden',
            message: err.message || 'Authentication failed',
            status: 401,
        });
    }
};
