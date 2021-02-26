import httpStatusCodes from 'http-status-codes';
import { Error } from 'mongoose';

export interface APIError {
  message: string;
  code: number;
  codeAsString?: string;
  description?: string;
  documentation?: string;
}

export interface APIErrorResoponse extends Omit<APIError, 'codeAsString'> {
  error: string;
}

export default class ApiError {
  public static format(error: APIError): APIErrorResoponse {
    return {
      ...{
        message: error.message,
        code: error.code,
        error: error.codeAsString 
          ? error.codeAsString 
          : httpStatusCodes.getStatusText(error.code),
      },
      ...(error.documentation && { documentatio: error.documentation }),
      ...(error.description && { description: error.description })
    }
  }
} 