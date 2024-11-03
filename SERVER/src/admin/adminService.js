import { db } from '../db.js'; // Import the db instance
import { users } from '../../drizzle/schema.js'; // Import the users table schema
import { transactions } from '../../drizzle/schema.js'; // Import the transactions table schema

// Service to get all users with their transactions
export const fetchAllUsersWithTransactions = async () => {
    try {
        const allUsers = await db
            .select()
            .from(users)
            .leftJoin(transactions, (users.id).equals(transactions.userId)) // Join transactions
            .execute();

        // Process the results to format them
        const usersWithTransactions = allUsers.reduce((acc, user) => {
            const { id, name, email, userType, verificationStatus, amount, purpose, expenseType, timestamp } = user;

            // Find or create user object in accumulator
            if (!acc[id]) {
                acc[id] = {
                    user_id: id,
                    name,
                    email,
                    userType,
                    verificationStatus,
                    transactions: [],
                };
            }

            // Push transaction data if it exists
            if (amount !== null) {
                acc[id].transactions.push({
                    amount,
                    purpose,
                    expenseType,
                    date: timestamp, // Assuming timestamp is in the desired date format
                });
            }

            return acc;
        }, {});

        return Object.values(usersWithTransactions); // Convert accumulator back to array
    } catch (error) {
        throw new Error("Error fetching users with transactions: " + error.message); // Error handling
    }
};
