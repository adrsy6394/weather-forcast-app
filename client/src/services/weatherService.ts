import api from './api';
import type { WeatherData, ForecastData } from '../types';

const weatherService = {
    getCurrentWeather: async (city: string, unit: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> => {
        const response = await api.get<WeatherData>(`/weather/current?city=${city}&units=${unit}`);
        // Backend should wrap response in a standard format, but if it returns direct OpenWeather data:
        return response.data;
    },

    getForecast: async (city: string, unit: 'metric' | 'imperial' = 'metric'): Promise<ForecastData> => {
        const response = await api.get<ForecastData>(`/weather/forecast?city=${city}&units=${unit}`);
        return response.data;
    },

    // Optional: Search history endpoint for saving searches
    // Optional: Search history endpoint for saving searches
    saveSearch: async (_city: string, _temperature: number, _condition: string) => {
        // This relies on a backend endpoint for history
         // return api.post('/history', { city, temperature, condition });
         // For now, we can just return resolved promise if endpoint isn't ready
         return Promise.resolve();
    }
};

export default weatherService;
