
import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import weatherService from '../services/weatherService';
import historyService from '../services/historyService';
import type { WeatherData, ForecastData } from '../types';

interface WeatherContextType {
    weather: WeatherData | null;
    forecast: ForecastData | null;
    city: string;
    loading: boolean;
    error: string | null;
    unit: 'metric' | 'imperial';
    toggleUnit: () => void;
    fetchWeather: (city: string) => Promise<void>;
    setCity: (city: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [city, setCity] = useState('Delhi');
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth(); // authentication check

    const fetchWeather = useCallback(async (cityName: string) => {
        setLoading(true);
        setError(null);
        try {
            const weatherData = await weatherService.getCurrentWeather(cityName, unit);
            const forecastData = await weatherService.getForecast(cityName, unit);
            
            setWeather(weatherData);
            setForecast(forecastData);
            setCity(cityName);
            
            // Save to history if authenticated
            if (weatherData && isAuthenticated) {
                try {
                    await historyService.addToHistory({
                        city: weatherData.name,
                        temperature: weatherData.main.temp,
                        condition: weatherData.weather[0].main
                    });
                } catch (historyErr) {
                    console.log('History save skipped/failed', historyErr);
                }
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    }, [unit, isAuthenticated]);

    // Refetch when unit changes, or on initial auth
    useEffect(() => {
        if (isAuthenticated) {
            fetchWeather(city);
        }
        // Disable exhaustive-deps to prevent loop when 'city' or 'fetchWeather' changes
        // we only want to trigger this on mount (auth) or unit change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unit, isAuthenticated]);

    const toggleUnit = () => {
        setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
    };

    // Initial fetch on mount is handled by the useEffect above (since city has initial value)
    // We can remove the [] effect or keep it strictly for mount.
    // If we keep the [unit, fetchWeather, city] effect, it will run on mount because 'city' and 'unit' are set.
    // So we don't need the [] effect.

    return (
        <WeatherContext.Provider value={{
            weather,
            forecast,
            city,
            loading,
            error,
            unit,
            toggleUnit,
            fetchWeather,
            setCity
        }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
};
