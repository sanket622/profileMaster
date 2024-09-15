import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/userController.js';
import passport from 'passport';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Route (with JWT verification)
router.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);

export default router;
