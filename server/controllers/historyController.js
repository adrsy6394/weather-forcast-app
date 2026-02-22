const mongoose = require('mongoose');
const SearchHistory = require('../models/SearchHistory');

// @desc    Get user search history
// @route   GET /api/v1/history
// @access  Private
const getHistory = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            console.error('[History] Fetch failed: No user in request');
            return res.status(401).json({ message: 'Not authorized' });
        }

        const userId = new mongoose.Types.ObjectId(req.user._id.toString());
        console.log(`[History] Fetching for user: ${userId}`);
        
        const history = await SearchHistory.find({ userId: userId }).sort({ searchedAt: -1 });
        console.log(`[History] Success: Found ${history.length} items`);
        
        res.json(history);
    } catch (error) {
        console.error('[History] Get Error:', error.message);
        next(error);
    }
};

// @desc    Add to search history
// @route   POST /api/v1/history
// @access  Private
const addHistory = async (req, res, next) => {
    try {
        const { city, temperature, condition } = req.body;
        
        if (!req.user || !req.user._id) {
            console.error('[History] Add failed: No user in request');
            return res.status(401).json({ message: 'Not authorized' });
        }

        const userId = new mongoose.Types.ObjectId(req.user._id.toString());
        console.log(`[History] Add Request: User=${userId}, City=${city}, Temp=${temperature}`);

        if (!city || temperature === undefined || !condition) {
            console.warn('[History] Add failed: Missing fields');
            return res.status(400).json({ message: 'Please provide city, temperature and condition' });
        }

        // Limit to 20 items
        try {
            const count = await SearchHistory.countDocuments({ userId: userId });
            if (count >= 20) {
                const oldest = await SearchHistory.findOne({ userId: userId }).sort({ searchedAt: 1 });
                if (oldest) {
                    await SearchHistory.findByIdAndDelete(oldest._id);
                }
            }
        } catch (limitErr) {
            console.error('[History] Cleanup error (ignored):', limitErr.message);
        }

        const historyItem = await SearchHistory.create({
            userId: userId,
            city,
            temperature,
            condition
        });

        console.log(`[History] Save success: ${historyItem._id}`);
        res.status(201).json(historyItem);
    } catch (error) {
        console.error('[History] Add Error:', error.message);
        res.status(500);
        next(error);
    }
};

// @desc    Delete history item
// @route   DELETE /api/v1/history/:id
// @access  Private
const deleteHistory = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const history = await SearchHistory.findById(req.params.id);

        if (!history) {
            return res.status(404).json({ message: 'History item not found' });
        }

        // Check user ownership
        if (history.userId.toString() !== req.user._id.toString()) {
            console.error(`[History] Auth Mismatch: ${history.userId} vs ${req.user._id}`);
            return res.status(401).json({ message: 'User not authorized' });
        }

        await history.deleteOne();
        res.json({ message: 'History removed' });
    } catch (error) {
        console.error('[History] Delete Error:', error.message);
        next(error);
    }
};

module.exports = {
    getHistory,
    addHistory,
    deleteHistory
};
