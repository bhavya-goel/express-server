const errorHandlerMsg = (errorMessage, request, response, next) => {
  response.send({
  error: errorMessage.error || errorMessage,
  message:  errorMessage.message || 'error',
  status: errorMessage.status || 500,
  timestamp: new Date(),
  });
};

export default errorHandlerMsg;
