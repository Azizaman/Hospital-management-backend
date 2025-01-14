"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRole = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: "No token provided" });
        return;
    }
    try {
        const decoded = yield new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
                if (err) {
                    reject(new Error("Invalid token"));
                }
                else {
                    resolve(decoded);
                }
            });
        });
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(403).json({ message: "Invalid token" });
        return;
    }
});
exports.verifyToken = verifyToken;
const verifyRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return;
            res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
exports.verifyRole = verifyRole;
//# sourceMappingURL=authMiddleware.js.map