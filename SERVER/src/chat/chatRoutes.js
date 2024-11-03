import { Router } from 'express';
import { createOrFetchChatController, getUserTransactionsController } from './chatController.js';

const chatRoutes = Router();

chatRoutes.post('/create-chat', createOrFetchChatController);
chatRoutes.get('/user-txns/:userId', getUserTransactionsController);

chatRoutes.post('/send-message', createOrFetchChatController);

export default chatRoutes;
