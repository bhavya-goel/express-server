export interface Ipermissions {
    getUsers: {
        [index: string]: string[];
    };
}
export interface Iusers {
    traineeEmail: string;
    reviewerEmail: string;
}
