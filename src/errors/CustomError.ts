import { INCORRECT_REQUEST, NOT_FOUND_ERROR } from "../constans/errors";

export class CustomError extends Error {
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
}
