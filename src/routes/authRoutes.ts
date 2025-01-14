import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const router = express.Router();

// Register user
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
     res.status(400).json({ message: 'Please provide email, password, and role.' });
     return;
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'delivery',  // Default role to 'delivery'
      },
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: 'Error while registering the user', error });
  }
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
     res.status(400).json({ message: 'Please provide email and password.' });
     return;
  }

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
       res.status(401).json({ message: 'Invalid credentials' });
       return;
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
       res.status(401).json({ message: 'Invalid credentials' });
       return;
    }

    // Create token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token,role: user.role  });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: 'Error logging in', error });
  }
});

export default router;
