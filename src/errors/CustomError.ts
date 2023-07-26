import { BAD_AUTHORISATION, INCORRECT_REQUEST, NOT_FOUND_ERROR } from "../constans/errors";

class CustomError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static incorrectRequest() {
    return new CustomError(INCORRECT_REQUEST.status, INCORRECT_REQUEST.message);
  }

  static notFoundError() {
    return new CustomError(NOT_FOUND_ERROR.status, NOT_FOUND_ERROR.message);
  }

  static notAuthorization() {
    return new CustomError(BAD_AUTHORISATION.status, BAD_AUTHORISATION.message);
  }
}

export default CustomError;
