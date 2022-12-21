import { HttpErrorResponse } from '@angular/common/http';
import { ErrorType } from '../enums/error.enum';
import { ICommonError } from '../interfaces/common-error.interface';
import { v4 as uuidv4 } from 'uuid';

export class CommonError {
  // Time of error
  // e.g. 2019-03-2507:27:51.877+0000
  timestamp: string;

  // Allows workflow tracing
  traceId: string;

  // Type of error (transversal: http error, purely functional error, etc.)
  type: ErrorType;

  // Global error message that gives a bit of detail
  // e.g. Employee (id = '1234') doesn't exist.
  message: string;

  // Stacktrace if available
  stack: string;

  // Payload with more details if available
  // e.g. { status: 500, error: "Internal Server Error", message: "Employee (id = '1234') doesn't exist.", path: "/employees/1234" }
  payload: Record<string, string | number>;

  constructor(data: ICommonError) {
    this.timestamp = data.timestamp || new Date().toUTCString();
    this.message = data.message || '';
    this.stack = data.stack || '';
    this.payload = data.payload || {};
    this.type = data.type || ErrorType.Unknown;
    this.traceId = data.traceId || uuidv4();
  }

  static fromHttpErrorResponse(error: HttpErrorResponse) {
    return new CommonError({
      type: ErrorType.HttpError,
      traceId: error.headers.get('X-Request-Id') || uuidv4(),
      message: error.message,
      stack: error.error,
      payload: {
        status: error.status,
        statusText: error.statusText,
        name: error.name,
        type: error.type,
        url: error.url || '',
        headers: JSON.stringify(error.headers),
      },
    });
  }

  static fromError(error: Error) {
    let message: string;

    if (!navigator.onLine) {
      message = 'No Internet Connection';
    } else {
      message = error.message ? error.message : error.toString();
    }

    return new CommonError({
      type: ErrorType.Unknown,
      traceId: uuidv4(),
      message,
      stack: error.stack || '',
    });
  }
}
