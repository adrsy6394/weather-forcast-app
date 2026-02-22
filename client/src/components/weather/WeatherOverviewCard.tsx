import React from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, CloudLightning } from 'lucide-react';
import type { WeatherData } from '../../types';

interface WeatherOverviewProps {
    weather: WeatherData;
}

const WeatherOverviewCard: React.FC<WeatherOverviewProps> = React.memo(({ weather }) => {
    // Helper to get icon based on weather condition
    const getWeatherIcon = (description: string) => {
        if (description.includes('rain')) return <CloudRain className="w-24 h-24 text-blue-400" />;
        if (description.includes('cloud')) return <Cloud className="w-24 h-24 text-gray-400" />;
        if (description.includes('snow')) return <CloudSnow className="w-24 h-24 text-white" />;
        if (description.includes('thunder')) return <CloudLightning className="w-24 h-24 text-yellow-500" />;
        if (description.includes('clear')) return <Sun className="w-24 h-24 text-yellow-400" />;
        return <Cloud className="w-24 h-24 text-gray-400" />;
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between text-slate-900 dark:text-white">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">{weather.name}</h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                    {formatDate(weather.dt)}
                </p>
                <div className="flex items-center">
                    <span className="text-8xl font-bold tracking-tighter">
                        {Math.round(weather.main.temp)}°
                    </span>
                    <div className="ml-6 flex flex-col">
                        <span className="text-2xl font-medium capitalize">
                            {weather.weather[0].description}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 mt-1">
                            H: {Math.round(weather.main.temp_max)}° L: {Math.round(weather.main.temp_min)}°
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-8 md:mt-0 animate-float">
                {getWeatherIcon(weather.weather[0].description)}
            </div>
        </div>
    );
});

export default WeatherOverviewCard;
