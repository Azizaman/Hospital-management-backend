import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
     res.status(401).json({ message: 'Access denied. No token provided.' });
     return;
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    // Assuming the payload has `id`, `email`, and `role`:
    req.user = decoded;  // Add the decoded information to the request object
    next();
  });
};



export const verifyRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role; // assuming the user role is stored in req.user (from the JWT)

    if (!allowedRoles.includes(userRole)) {
       res.status(403).json({ message: "Access denied. You don't have permission to access this resource." });
       return;
    }

    // Proceed to the next middleware or route handler
    next();
  };
};
