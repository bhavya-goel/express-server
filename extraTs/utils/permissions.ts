
import { permissions } from '../constants';
export default function hasPermissions(moduleName: string, role: string, permissionType: string): boolean {
    // To check valid Module Name
    if (!permissions.hasOwnProperty(moduleName)) {
        console.log( 'no such module found');
        return false;
    } else if (!permissions[moduleName].hasOwnProperty(permissionType)) { // To check valid Permission
        console.log(moduleName, 'has no such permission:' , permissionType);
        return false;
    } else if (permissions[moduleName][permissionType].indexOf(role) === -1 &&
    (!permissions[moduleName].all.includes(role))) {      // To Check valid role
        console.log(role, 'is not assigned permission - ', permissionType, 'for module', moduleName);
        return false;
    } else {
        console.log(role, 'is assigned \npermission -', permissionType, '\nfor module - ', moduleName);
        return true;

    }
}
