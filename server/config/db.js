const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('CRITICAL: MongoDB Connection Failed!');
        console.error(`Error Details: ${error.message}`);
        console.error('Check your MONGO_URI and IP Whitelist on MongoDB Atlas.');
        process.exit(1);
    }
};

module.exports = connectDB;
