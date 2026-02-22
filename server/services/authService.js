const User = require('../models/User');
const SearchHistory = require('../models/SearchHistory');
const generateToken = require('../utils/generateToken');

// Register user
const registerUser = async (userData) => {
    const { name, email, password } = userData;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            bio: user.bio,
            location: user.location,
            token: generateToken(user._id),
        };
    } else {
        throw new Error('Invalid user data');
    }
};

// Login user
const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            bio: user.bio,
            location: user.location,
            token: generateToken(user._id),
        };
    } else {
        throw new Error('Invalid email or password');
    }
};

// Get current user profile
const getUserProfile = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            bio: user.bio,
            location: user.location,
        };
    } else {
        throw new Error('User not found');
    }
};

// Update user profile
const updateUserProfile = async (userId, updateData) => {
    const user = await User.findById(userId);

    if (user) {
        user.name = updateData.name || user.name;
        user.email = updateData.email || user.email;
        user.bio = updateData.bio !== undefined ? updateData.bio : user.bio;
        user.location = updateData.location !== undefined ? updateData.location : user.location;

        if (updateData.password) {
            user.password = updateData.password;
        }

        const updatedUser = await user.save();

        return {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            bio: updatedUser.bio,
            location: updatedUser.location,
            token: generateToken(updatedUser._id),
        };
    } else {
        throw new Error('User not found');
    }
};

// Delete user account and all associated data
const deleteUserAccount = async (userId) => {
    // 1. Delete Search History
    await SearchHistory.deleteMany({ userId });

    // 2. Delete User
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        throw new Error('User not found');
    }

    return { message: 'User and all associated data deleted successfully' };
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUserAccount,
};
