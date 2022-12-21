import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NGXLogger } from 'ngx-logger';
import { CommonError } from '../dto/common-error.dto';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) {}

  /**
   * Handles any incoming thrown error.
   *
   * @param {Error | HttpErrorResponse} error - Error | HttpErrorResponse
   */
  handleError(error: Error | HttpErrorResponse | CommonError) {
    const logger = this.injector.get(NGXLogger);

    let commonError: CommonError;

    if (error instanceof HttpErrorResponse) {
      commonError = CommonError.fromHttpErrorResponse(error); // Server error
    } else if (error instanceof CommonError) {
      commonError = error;
    } else {
      commonError = CommonError.fromError(error); // Client error
    }

    // Always log errors
    logger.error(commonError.message);
  }
}
