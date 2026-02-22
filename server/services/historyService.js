const SearchHistory = require('../models/SearchHistory');

// Add to history with limit of 20
const addToHistory = async (userId, city, temperature, condition) => {
    // Check count
    const count = await SearchHistory.countDocuments({ userId });

    if (count >= 20) {
        // Delete oldest
        const oldest = await SearchHistory.findOne({ userId }).sort({ searchedAt: 1 });
        if (oldest) {
            await SearchHistory.findByIdAndDelete(oldest._id);
        }
    }

    // Create new
    const history = await SearchHistory.create({
        userId,
        city,
        temperature,
        condition
    });

    return history;
};

// Get user history
const getHistory = async (userId) => {
    return await SearchHistory.find({ userId }).sort({ searchedAt: -1 });
};

// Delete history item
const deleteHistory = async (id, userId) => {
    const history = await SearchHistory.findById(id);

    if (!history) {
        throw new Error('History item not found');
    }

    // Ensure user owns the item
    if (history.userId.toString() !== userId.toString()) {
        throw new Error('Not authorized to delete this item');
    }

    await SearchHistory.findByIdAndDelete(id);
    return { message: 'Item deleted' };
};

module.exports = {
    addToHistory,
    getHistory,
    deleteHistory
};
