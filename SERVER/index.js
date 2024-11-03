import express from 'express';
import cors from 'cors'; // Import CORS
import authRoutes from './src/auth/authRoutes.js';
import adminRoutes from './src/admin/adminRoutes.js';
import chatRoutes from './src/chat/chatRoutes.js';

const app = express();

// Apply CORS middleware
app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
