import * as jwt from 'jsonwebtoken';
import { hasPermissions } from '../../../extraTs/utils';
import { configuration } from '../../config';
export default (moduleName, permissionType) => (req, res, next) => {
    try {
        const authorization = 'authorization';
        const token = req.headers[authorization];
        const key = configuration.secretKey;
        const info = jwt.verify(token, key);
        const role = info.role;
        if (hasPermissions(moduleName, role, permissionType)) {
            next();
        }
        else {
            next({
                error: 'unauthorized access',
                status: 403,
            });
        }
    } catch (err) {
        next({
            error: 'Authentication failed',
            status: 403,
        });
    }
};
