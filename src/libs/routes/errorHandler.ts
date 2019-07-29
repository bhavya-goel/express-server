export const errorHandlerMsg = () => {
				response.send({
				error: errorMessage,
				message: 'error',
				status: 500,
				timestamp: new Date(),
			});
};