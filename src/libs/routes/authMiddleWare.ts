import * as jwt from 'jsonwebtoken';
import { hasPermissions } from '../../../extraTs/utils';
import { configuration } from '../../config';
import { UserRepository } from '../../repositories';
const userRepository = new UserRepository();
export default (moduleName, permissionType) => (req, res, next) => {
    try {
        const authorization = 'authorization';
        const token = req.headers[authorization];
        const key = configuration.secretKey;
        const info = jwt.verify(token, key);
        userRepository.get({ _id: info._id})
        .then((user) => {
            if (!user) {
                return next({
                    error: 'Authentication failed',
                    message: 'Token not found',
                    status: 403,
                });
            }
            if (hasPermissions(moduleName, user.role, permissionType)) {
                req.user = user;
                next();
            }
            else {
                return next({
                    error: 'unauthorized access',
                    message: `${info.role} doesn't has ${permissionType} access`,
                    status: 403,
                });
            }
        });
    } catch (err) {
        return next({
            error: 'Authentication failed',
            message: 'Token not found',
            status: 403,
        });
    }
};
