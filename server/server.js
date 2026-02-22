const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



// Rate Limiting
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 1000 requests per windowMs
    message: 'Too many requests from this IP, please try again after 1 minute',
});
// app.use(limiter);

// Base Route
// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/weather', require('./routes/weatherRoutes'));
app.use('/api/v1/history', require('./routes/historyRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const { errorHandler, notFound } = require('./middleware/errorMiddleware');

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
