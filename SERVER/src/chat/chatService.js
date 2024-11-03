import { chats, transactions } from "../../drizzle/schema.js";
import { eq } from "drizzle-orm"; 
import { db } from "../db.js";

export const createOrFetchChatService = async (userId, message, senderType) => {
    try {
        // Check if any chat messages exist for this user
        const existingChat = await db
            .select()
            .from(chats)
            .where(eq(chats.user_id, userId))
            .execute();

        // Insert a new chat message for both new and existing chats
        await db
            .insert(chats)
            .values({
                user_id: userId,
                message,
                sender: senderType,
                timestamp: new Date(),
            })
            .execute();

        const messageType = existingChat.length === 0 ? 'Chat created successfully' : 'Chat updated successfully';
        return { success: true, message: messageType };
    } catch (error) {
        console.error('Error in createOrFetchChatService:', error.message);
        throw new Error('Failed to create or fetch chat');
    }
};

export const getUserTransactionsService = async (userId) => {
    try {
        // Use the correct field reference for `user_id`
        const transactionsResult = await db
            .select()
            .from(transactions)
            .where(eq(transactions.userId, userId)) 
            .execute();

        return transactionsResult || [];
    } catch (error) {
        console.error('Error in getUserTransactionsService:', error.message);
        throw new Error('Failed to fetch user transactions');
    }
};
