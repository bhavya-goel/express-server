import { users } from './constants';
import { diamond, equilateral } from './pattern/index';
import { hasPermissions, validateUsers } from './utils/index';
equilateral(5);
diamond(5);
validateUsers(users);
hasPermissions('getUsers', 'head-trainer', 'all');
