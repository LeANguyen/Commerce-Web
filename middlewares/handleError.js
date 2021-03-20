function handleError(error, request, response, next) {
  // custom application error
  if (typeof error === "string") {
    return response
      .status(400)
      .json({ status: 400, success: false, error: error.message });
  }

  // jwt authentication error
  if (error.name === "UnauthorizedError") {
    return response
      .status(401)
      .json({ status: 401, success: false, error: "Invalid Token" });
  }

  // used email error
  if (error.routine === "_bt_check_unique") {
    response.status(409).json({
      status: 409,
      success: false,
      error: "User with this email already exists"
    });
  }

  // default to 500 server error
  return response
    .status(500)
    .json({ status: 500, success: false, message: error.message });
}

module.exports = handleError;
