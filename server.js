import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import articleRoutes from './routes/articleRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use('/api/articles', articleRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});