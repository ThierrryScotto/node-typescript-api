import AuthService from '@src/services/auth';
import { Response, Request, NextFunction } from 'express';

export function authMiddleware(
  req: Partial<Request>, 
  res: Partial<Response>, 
  next: NextFunction
  ): void {
  const token = req.headers?.['x-access-token'];

  try {
    const decoded = AuthService.decodedToken(token as string);
    req.decoded = decoded;
    next();
  } catch(err) {
    res.status?.(401).send({ code: 401, error: err.message })
  }
}