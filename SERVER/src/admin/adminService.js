import { db } from '../db.js'; 
import { users } from '../../drizzle/schema.js'; 
import { transactions } from '../../drizzle/schema.js'; 
import { eq } from "drizzle-orm"; 

// Service to get all users with their transactions
export const fetchAllUsersWithTransactions = async () => {
    try {
        const allUsers = await db.select().from(users).innerJoin(transactions, eq(users.id, transactions.userId));
        console.log("allusers: ", allUsers);

        // Process the results to format them
        const usersWithTransactions = allUsers.reduce((acc, record) => {
            const { 
                users: {
                    id: userId, 
                    name, 
                    email, 
                    userType, 
                    verificationStatus
                }, 
                transactions: {
                    amount, 
                    purpose, 
                    expenseType, 
                    timestamp
                } 
            } = record;

            if (!acc[userId]) {
                acc[userId] = {
                    user_id: userId,
                    name,
                    email,
                    userType,
                    verificationStatus,
                    transactions: [],
                };
            }

            // Add transaction if present
            if (amount != null) { // Using != to cover both null and undefined
                acc[userId].transactions.push({
                    amount,
                    purpose,
                    expenseType,
                    date: timestamp, // Assuming timestamp is in the desired format
                });
            }

            return acc;
        }, {});

        return Object.values(usersWithTransactions); // Convert object back to array
    } catch (error) {
        console.error("Database query error:", error); // Log error for debugging
        throw new Error(`Error fetching users with transactions: ${error.message}`);
    }
};
