import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      const token = authHeader.split(' ')[1];

      const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

      if (requiredRoles.length && !requiredRoles.includes(decoded.role as TUserRole)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Access forbidden: insufficient rights');
      }

      // req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        next(new AppError(httpStatus.UNAUTHORIZED, 'Token has expired'));
      } else if (error instanceof jwt.JsonWebTokenError) {
        next(new AppError(httpStatus.UNAUTHORIZED, 'Invalid token'));
      } else {
        next(new AppError(httpStatus.UNAUTHORIZED, 'Authentication failed'));
      }
    }
  };
};

export default auth;
