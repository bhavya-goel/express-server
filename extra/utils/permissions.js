
const permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read : ['trainee', 'trainer'],
        write : ['trainer'],
        delete: []
    }
}
function hasPermissions(moduleName, role, permissionType){
    
    // To check valid Module Name
    if(!permissions.hasOwnProperty(moduleName)){
        console.log( "no such module found")
        return false
    }
    // To check valid Permission
    else if(!permissions[moduleName].hasOwnProperty(permissionType)){
        console.log(moduleName,"has no such permission:", permissionType)
        return false
    }
    //To Check valid role
    else if(permissions[moduleName][permissionType].indexOf(role) == -1){
        console.log(role,"is not assigned permission - ",permissionType,"for module", moduleName)
        return false
    }
    else{
        console.log(role,"is assigned \npermission -",permissionType,"\nfor module - ", moduleName)
        return true

    }
}  
hasPermissions("getUsers", "head-trainer", "all")

