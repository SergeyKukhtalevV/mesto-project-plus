import { INCORRECT_REQUEST, NOT_FOUND_ERROR } from "../constans/errors";

export class CustomError extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static incorrectRequest() {
    return new CustomError(INCORRECT_REQUEST.status, INCORRECT_REQUEST.message);
  }

  static notFoundError() {
    return new CustomError(NOT_FOUND_ERROR.status, NOT_FOUND_ERROR.message);
  }
}
