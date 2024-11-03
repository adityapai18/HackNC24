import { transactions, userGoals } from "../../drizzle/schema.js";
import { db } from "../db.js";
import { eq, desc } from "drizzle-orm";
export const addTransaction = async ({
  userId,
  amount,
  purpose,
  expenseType,
}) => {
  try {
    // Insert a new transaction
    const result = await db
      .insert(transactions)
      .values({
        userId,
        amount,
        purpose,
        expenseType,
        timestamp: new Date(), // Use current timestamp
      })
      .returning();

    return {
      success: true,
      message: "Transaction added successfully",
      transactionId: result[0].id, // Assuming result provides the inserted ID
    };
  } catch (error) {
    console.error("Error adding transaction:", error);
    return {
      success: false,
      message: "Failed to add transaction",
      error,
    };
  }
};

export const allExpenses = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const userTransactions = await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.timestamp));

    // Map the data to plain objects to remove circular references
    const plainTransactions = userTransactions.map((transaction) => ({
      id: transaction.id,
      userId: transaction.userId,
      amount: transaction.amount,
      purpose: transaction.purpose,
      expenseType: transaction.expenseType,
      timestamp: transaction.timestamp,
    }));

    res.json({
      success: true,
      transactions: plainTransactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};

export async function addGoal(req, res) {
  const { userId, goalType, success, amount, reward, goalDeadline } = req.body;

  // Validate required fields
  if (!userId || !goalType || amount == null || !goalDeadline) {
    return res.status(400).json({
      success: false,
      message: "userId, goalType, amount, and goalDeadline are required.",
    });
  }

  try {
    const result = await db.insert(userGoals).values({
      userId,
      goalType,
      success: success || false, // Default success to false if not provided
      amount,
      reward,
      goalDeadline,
    });

    res.status(201).json({
      success: true,
      message: "Goal added successfully",
      goalId: result.insertId, // Assuming result provides the inserted ID
    });
  } catch (error) {
    console.error("Error adding goal:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add goal",
      error: error.message,
    });
  }
}

export async function getGoals(req, res) {
  const { userId } = req.query;

  // Validate that userId is provided
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const goals = await db
      .select()
      .from(userGoals)
      .where(eq(userGoals.userId, userId))
      .orderBy(desc(userGoals.goalDeadline)); // Optionally order by deadline

    res.json({
      success: true,
      goals,
    });
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch goals",
      error: error.message,
    });
  }
}
