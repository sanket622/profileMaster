import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/userController.js';
import passport from 'passport';
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Route (with JWT verification)
// The passport.authenticate('jwt', { session: false }) middleware triggers Passport to use the jwt strategy, which:
router.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);

// router.get('/profile', protect, getProfile);

export default router;
