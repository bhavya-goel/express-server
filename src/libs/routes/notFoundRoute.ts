export const routeNotFound = (request, response, next) => {
    next({
        error: 'Not Found',
        message: 'error',
        status: 404,
    });
};
