import { User } from './models/User';  // or wherever your User type is defined

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Assuming 'User' is the type of the user object added to the request
    }
  }
}
