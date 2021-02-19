import { CUSTOM_VALIDATION } from '@src/models/user';
import { Response } from 'express';
import mongoose from 'mongoose';

export abstract class BaseController {
  protected sendCreateUpdateErrorResponse(res: Response, error: mongoose.Error.ValidationError): void {
    if (error instanceof mongoose.Error.ValidationError) {
      
      const duplicatedKindErrors = this.handleClientsError(error);
      
      res.status(duplicatedKindErrors.code).send({ 
        code: duplicatedKindErrors.code, 
        error:duplicatedKindErrors.error 
      });
    } else {
      res.status(500).send({ code: 500, error: 'Something went wrong' });
    }
  }

  private handleClientsError(error: mongoose.Error.ValidationError)
    : { code: number, error: string } {
    const duplicatedKindErrors = Object.values(error.errors).filter(
      (err) => err.kind === CUSTOM_VALIDATION.DUPLICATED
    );

    if (duplicatedKindErrors.length) {
      return { code: 409, error: error.message };
    }

    return { code: 422, error: error.message };
  }
}