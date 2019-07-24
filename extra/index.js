import {equilateral, diamond} from "./pattern/index.js"
import {validateUsers, hasPermissions} from "./utils/index.js"
import {permissions, users} from "./constants.js"
equilateral(process.argv[2])
diamond(process.argv[3])
validateUsers(users)
hasPermissions("getUsers", "head-trainer", "all")