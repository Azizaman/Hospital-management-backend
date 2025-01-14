import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request to include 'user' property
interface CustomRequest extends Request {
  user?: any;
}



// Token verification middleware
export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer

  if (!token) {
     res.status(403).json({ message: "No token provided" });
     return;
  }

  try {
    const decoded = await new Promise<any>((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
        if (err) {
          reject(new Error("Invalid token"));
        } else {
          resolve(decoded);
        }
      });
    });

    req.user = decoded; // Attach decoded user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
     res.status(403).json({ message: "Invalid token" });
     return;
  }
};

// Role verification middleware
export const verifyRole = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      return; res.status(403).json({ message: 'Forbidden' });
    }
    next(); // User has required role, proceed
  };
};