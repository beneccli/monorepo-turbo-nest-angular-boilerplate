import { ErrorType } from '../enums/error.enum';

export interface ICommonError {
  timestamp?: string;
  traceId?: string;
  type?: ErrorType;
  message?: string;
  stack?: string;
  payload?: Record<string, string | number>;
}
