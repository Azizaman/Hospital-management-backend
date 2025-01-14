import { Request, Response, NextFunction } from 'express';
interface CustomRequest extends Request {
    user?: any;
}
export declare const verifyToken: (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyRole: (roles: string[]) => (req: CustomRequest, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=authMiddleware.d.ts.map