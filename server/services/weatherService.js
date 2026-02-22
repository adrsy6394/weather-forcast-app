const axios = require('axios');

const getCurrentWeather = async (city) => {
    try {
        let queryCity = city;
        let isIndiaQuery = false;
        
        if (city.toLowerCase() === 'india') {
            queryCity = 'Delhi,IN';
            isIndiaQuery = true;
        }

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
        );

        const data = response.data;
        if (isIndiaQuery) {
            data.name = 'India';
        }

        return data;
    } catch (error) {
        const message = error.response ? error.response.data.message : 'Error fetching current weather';
        const err = new Error(message);
        err.statusCode = error.response ? error.response.status : 500;
        throw err;
    }
};

const getForecast = async (city) => {
    try {
        let queryCity = city;
        let isIndiaQuery = false;
        
        if (city.toLowerCase() === 'india') {
            queryCity = 'Delhi,IN';
            isIndiaQuery = true;
        }

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${queryCity}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
        );

        const data = response.data;
        if (isIndiaQuery && data.city) {
            data.city.name = 'India';
        }

        return data;
    } catch (error) {
        const message = error.response ? error.response.data.message : 'Error fetching forecast';
        const err = new Error(message);
        err.statusCode = error.response ? error.response.status : 500;
        throw err;
    }
};

module.exports = {
    getCurrentWeather,
    getForecast,
};
