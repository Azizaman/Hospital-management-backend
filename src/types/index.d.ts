import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;  // Define the type of `user` as per your needs, for example, `User | undefined`
    }
  }
}
