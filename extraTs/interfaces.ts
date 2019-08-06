export interface IPermissions {
    [module: string]: {
        [type: string]: string[];
    };
}
export interface IUsers {
    traineeEmail: string;
    reviewerEmail: string;
}
