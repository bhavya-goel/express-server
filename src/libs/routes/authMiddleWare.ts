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
        console.log(info);
        userRepository.get({ id: info.id})
        .then((user) => {
            if (!user) {
                return next({
                    error: 'Authentication failed',
                    status: 403,
                });
            }
            if (hasPermissions(moduleName, info.role, permissionType)) {
                req.user = info;
                next();
            }
            else {
                return next({
                    error: 'unauthorized access',
                    status: 403,
                });
            }
        });
    } catch (err) {
        return next({
            error: 'Authentication failed',
            status: 403,
        });
    }
};
