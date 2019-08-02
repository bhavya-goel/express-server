import {equilateral, diamond} from "./pattern/index.js"
import {validateUsers, hasPermissions} from "./utils/index.js"
import {users} from "./constants.js"
// to print equilateral triangle
equilateral(process.argv[2])
// to print diamond
diamond(process.argv[3])
// to check user by validating emailID
validateUsers(users)
// to check permissions of a role
hasPermissions("getUsers", "head-trainer", "write")

