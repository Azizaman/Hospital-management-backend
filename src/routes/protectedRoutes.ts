import express from 'express';
import { expressjwt } from 'express-jwt';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Protect a route with JWT
router.get('/protected', expressjwt({ secret: process.env.JWT_SECRET || 'your_jwt_secret', algorithms: ['HS256'] }), (req, res) => {
  res.json({ message: 'You have access to this protected route', user: req.user });
});

router.get('/protectd', verifyToken, (req, res) => {
  res.json({ message: 'You have access to this protected route', user: req.user });
});

export default router;

