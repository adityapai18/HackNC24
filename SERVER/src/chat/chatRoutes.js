import { Router } from "express";
import {
  createOrFetchChatController,
  getUserTransactionsController,
} from "./chatController.js";
import { sendMessageService } from "./chatService.js";

const chatRoutes = Router();

chatRoutes.post("/create-chat", createOrFetchChatController);
chatRoutes.get("/user-txns/:userId", getUserTransactionsController);

chatRoutes.post("/send-message", sendMessageService);

export default chatRoutes;
