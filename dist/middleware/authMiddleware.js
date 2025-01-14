"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRole = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
        // Assuming the payload has `id`, `email`, and `role`:
        req.user = decoded; // Add the decoded information to the request object
        next();
    });
};
exports.verifyToken = verifyToken;
const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        var _a;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role; // assuming the user role is stored in req.user (from the JWT)
        if (!allowedRoles.includes(userRole)) {
            res.status(403).json({ message: "Access denied. You don't have permission to access this resource." });
            return;
        }
        // Proceed to the next middleware or route handler
        next();
    };
};
exports.verifyRole = verifyRole;
