

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode;

  if (statusCode < 399) {
      next()
  }

  const responseBody = {
      message: err.message,
  }

  res.json(responseBody);

};

module.exports = globalErrorHandler;
