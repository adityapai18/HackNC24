import { fetchAllUsersWithTransactions } from './adminService.js'; // Import the service function

// Controller to get all users with their transactions
export const getAllUsers = async (req, res) => {
    try {
        const usersWithTransactions = await fetchAllUsersWithTransactions(); // Call the service to fetch data
        res.status(200).json(usersWithTransactions); // Respond with the list of users and their transactions
    } catch (error) {
        console.error("Error retrieving users with transactions:", error);
        res.status(500).json({ message: "Internal Server Error" }); // Handle any errors
    }
};