const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SearchHistory = require('./models/SearchHistory');
const User = require('./models/User');

dotenv.config();

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const user = await User.findOne();
        if (!user) {
            console.log('No user found to link history to. Please register a user first.');
            process.exit(1);
        }

        console.log(`Using user: ${user.email} (${user._id})`);

        const newItem = await SearchHistory.create({
            userId: user._id,
            city: 'Test City',
            temperature: 25,
            condition: 'Clear'
        });

        console.log('History Item Created Successfully:', newItem);
        
        const fetch = await SearchHistory.find({ userId: user._id });
        console.log(`Found ${fetch.length} items for this user.`);

        process.exit(0);
    } catch (error) {
        console.error('Test Failed:', error);
        process.exit(1);
    }
};

test();
