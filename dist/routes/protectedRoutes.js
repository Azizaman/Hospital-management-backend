"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_jwt_1 = require("express-jwt");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/protected', (0, express_jwt_1.expressjwt)({ secret: process.env.JWT_SECRET || 'your_jwt_secret', algorithms: ['HS256'] }), (req, res) => {
    res.json({ message: 'You have access to this protected route', user: req.user });
});
router.get('/protectd', authMiddleware_1.verifyToken, (req, res) => {
    res.json({ message: 'You have access to this protected route', user: req.user });
});
exports.default = router;
//# sourceMappingURL=protectedRoutes.js.map