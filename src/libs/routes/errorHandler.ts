export const errorHandlerMsg = (errorMessage, request, response) => {
				response.send({
				error: errorMessage,
				message: 'error',
				status: 500,
				timestamp: new Date(),
			});
};