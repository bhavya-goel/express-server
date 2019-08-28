const errorHandlerMsg = (errorMessage, request, response, next) => {
  response.send({
  error: errorMessage.error || 'error',
  message:  errorMessage.message || errorMessage,
  status: errorMessage.status || 500,
  timestamp: new Date(),
  });
};

export default errorHandlerMsg;
