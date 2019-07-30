const errorHandlerMsg = (errorMessage, request, response, next) => {
	response.send({
		error: errorMessage,
		message: 'error',
		status: 500,
		timestamp: new Date(),
	});
};
export default errorHandlerMsg;
