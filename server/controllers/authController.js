const authService = require('../services/authService');

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// @desc    Auth user & get token
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser(email, password);
        res.json(user);
    } catch (error) {
        res.status(401);
        next(error);
    }
};

// @desc    Get current user profile
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = async (req, res, next) => {
    try {
        const user = await authService.getUserProfile(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(404);
        next(error);
    }
};

// @desc    Update current user profile
// @route   PUT /api/v1/auth/me
// @access  Private
const updateMe = async (req, res, next) => {
    try {
        const user = await authService.updateUserProfile(req.user._id, req.body);
        res.json(user);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// @desc    Delete current user account
// @route   DELETE /api/v1/auth/me
// @access  Private
const deleteMe = async (req, res, next) => {
    try {
        const result = await authService.deleteUserAccount(req.user._id);
        res.json(result);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

module.exports = {
    register,
    login,
    getMe,
    updateMe,
    deleteMe,
};
