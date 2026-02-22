const dotenv = require('dotenv');
const weatherService = require('./services/weatherService');

dotenv.config();

const testWeather = async () => {
    const city = 'New York';
    console.log(`Testing weather for ${city}...`);

    try {
        console.log('1. Fetching Current Weather...');
        const currentWeather = await weatherService.getCurrentWeather(city);
        console.log('✅ Current Weather:', currentWeather.weather[0].description, `${currentWeather.main.temp}°C`);

        console.log('\n2. Fetching Forecast...');
        const forecast = await weatherService.getForecast(city);
        console.log('✅ Forecast:', forecast.list.length, 'entries received');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
};

testWeather();
