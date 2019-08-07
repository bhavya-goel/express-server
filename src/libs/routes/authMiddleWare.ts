import * as jwt from 'jsonwebtoken';
import { configuration } from '../../config';
import { hasPermissions } from '../../../extraTs/utils';
export default (moduleName, permissionType) => (req, res, next) => {
    try {
        const token = req.headers['authorization'];
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
