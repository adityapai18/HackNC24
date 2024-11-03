import { chats, transactions, users, userGoals } from "../../drizzle/schema.js";
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

    const messageType =
      existingChat.length === 0
        ? "Chat created successfully"
        : "Chat updated successfully";
    return { success: true, message: messageType };
  } catch (error) {
    console.error("Error in createOrFetchChatService:", error.message);
    throw new Error("Failed to create or fetch chat");
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
    console.error("Error in getUserTransactionsService:", error.message);
    throw new Error("Failed to fetch user transactions");
  }
};

export const sendMessageService = async (req, res) => {
  const userId = req.body.userId;
  const userInput = req.body.input; // Message input from the user
  try {
    // Fetch user data
    const [user] = await db.select().from(users).where(eq(users.id, userId));

    if (!user) {
      throw new Error("User not found");
    }

    // Fetch transactions and group by month
    const transactionRecords = await db
      .select({
        transaction_id: transactions.id,
        amount: transactions.amount,
        date: transactions.timestamp,
        purpose: transactions.purpose,
        type: transactions.expenseType,
      })
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(transactions.timestamp);

    const groupedTransactions = transactionRecords.reduce(
      (acc, transaction) => {
        const month = new Date(transaction.date).toLocaleString("default", {
          month: "long",
        });
        if (!acc[month]) acc[month] = [];
        acc[month].push({
          transaction_id: transaction.transaction_id,
          amount: transaction.amount,
          date: transaction.date.toISOString().split("T")[0],
          purpose: transaction.purpose,
          type: transaction.type,
        });
        return acc;
      },
      {}
    );

    // Fetch user goals
    const [goalRecord] = await db
      .select({
        monthly_goal: userGoals.amount,
        long_term_goal_value: userGoals.amount,
        target_date: userGoals.goalDeadline,
      })
      .from(userGoals)
      .where(eq(userGoals.userId, userId)); // Assuming 'long_term' is a valid goalType

    const goals = {
      monthly_goal: 1200, // Assuming a placeholder value; replace if dynamically fetched
      long_term_goal: {
        goal_value: goalRecord ? goalRecord.long_term_goal_value : null,
        target_date: goalRecord ? goalRecord.target_date : null,
      },
    };

    // Build the final JSON structure to send to the chatbot
    const data = {
      user_id: user.id,
      name: user.name,
      age: 30, // Placeholder; replace if dynamically fetched
      transactions: groupedTransactions,
      goals,
    };

    console.log({ user_data: data, input: userInput });
    // Send user data and input to chatbot
    const chatBotRes = await fetch("http://127.0.0.1:5000/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_data: data,
        input: userInput,
      }),
    });

    console.log(
      JSON.stringify({
        user_data: data,
        input: userInput,
      })
    );

    const chat_bot_res = await chatBotRes.json();
    console.log(chat_bot_res);
    const botMessage = chat_bot_res.reply; // Assuming the bot response is under "message"

    // Store user's message in chats table
    await db
      .insert(chats)
      .values({
        user_id: userId,
        message: userInput,
        sender: "user",
        timestamp: new Date(),
      })
      .execute();

    // Store bot's response in chats table
    await db
      .insert(chats)
      .values({
        user_id: userId,
        message: botMessage,
        sender: "bot",
        timestamp: new Date(),
      })
      .execute();

    return res.json({
      success: true,
      message: botMessage, // All chats between the user and the bot
    });
  } catch (error) {
    console.error("Error in sendMessageService:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};
