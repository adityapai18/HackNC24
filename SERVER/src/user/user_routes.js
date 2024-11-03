import { Router } from 'express';
import { addExpense } from './user_controller.js';
import { allExpenses, addGoal, getGoals } from './user_service.js';

const router = Router();

// User registration
router.post('/add-expense', addExpense);
router.get('/all-trans', allExpenses);

router.post('/add-goal', addGoal);
router.get('/all-goals', getGoals);


export default router;
