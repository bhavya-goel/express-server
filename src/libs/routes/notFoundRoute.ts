export const routeNotFound = (request, response, next) => {
    next({
        error: 'Client Error',
        message: 'Not Found',
        status: 404,
    });
};
