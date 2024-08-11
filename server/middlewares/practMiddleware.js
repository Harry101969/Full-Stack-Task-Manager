const routeNotFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = req.statusCode === 200 ? 500 : res.statusCode; //This will only send 500 when its and error and 200 will be changed to 500 if theres an error.
  let errMsg = err.message;
  if (err.name === "CaseError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }
  req.status(statusCode).json({
    message: errMsg,
    stack:
      ProcessingInstruction.end.NODE_ENV !== "production" ? null : err.stack,
  });
};
export { errorHandler, routeNotFound };
