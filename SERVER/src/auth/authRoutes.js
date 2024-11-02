import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  resetPassword,
} from './authController.js';

const router = Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// User logout
router.post('/logout', logoutUser);

// Refresh token
router.post('/refresh', refreshToken);

// Password reset request
router.post('/reset-password', resetPassword);

export default router;
