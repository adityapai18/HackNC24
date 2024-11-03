import { createOrFetchChatService, getUserTransactionsService } from "./chatService.js";

export const createOrFetchChatController = async (req, res) => {
    try {
        const { userId, message, senderType } = req.body;

        if (!userId || !message || !senderType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Ensure the service call works correctly and handle any errors
        const result = await createOrFetchChatService(userId, message, senderType);

        // Check the result before sending response
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json({ error: 'Failed to process chat operation' });
        }
    } catch (error) {
        console.error('Error in createOrFetchChatController:', error.message);
        return res.status(500).json({ error: 'Failed to create or fetch chat' });
    }
};

export const getUserTransactionsController = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const result = await getUserTransactionsService(userId);

        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ error: 'No transactions found for this user' });
        }
    } catch (error) {
        console.error('Error in getUserTransactionsController:', error.message);
        return res.status(500).json({ error: 'Failed to fetch user transactions' });
    }
};
