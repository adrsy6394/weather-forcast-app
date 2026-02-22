const weatherService = require('../services/weatherService');

// @desc    Get current weather for a city
// @route   GET /api/v1/weather/current?city=
// @access  Public
const getCurrentWeather = async (req, res, next) => {
    try {
        const { city } = req.query;

        if (!city) {
            res.status(400);
            throw new Error('City parameter is required');
        }

        const data = await weatherService.getCurrentWeather(city);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

// @desc    Get 5-day forecast for a city
// @route   GET /api/v1/weather/forecast?city=
// @access  Public
const getForecast = async (req, res, next) => {
    try {
        const { city } = req.query;

        if (!city) {
            res.status(400);
            throw new Error('City parameter is required');
        }

        const data = await weatherService.getForecast(city);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCurrentWeather,
    getForecast,
};
