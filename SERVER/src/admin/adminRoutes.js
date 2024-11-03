import { Router } from 'express';
import { getAllUsers } from './adminController.js';

const router = Router();

// Route to get all users
router.get('/allUsers', getAllUsers);

export default router;
