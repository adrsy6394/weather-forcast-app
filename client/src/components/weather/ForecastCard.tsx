import React from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, CloudLightning } from 'lucide-react';

interface ForecastCardProps {
    day: string;
    tempMax: number;
    tempMin: number;
    condition: string;
}

const ForecastCard: React.FC<ForecastCardProps> = React.memo(({ day, tempMax, tempMin, condition }) => {
    const getWeatherIcon = (condition: string) => {
        const lowerCondition = condition.toLowerCase();
        if (lowerCondition.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-400" />;
        if (lowerCondition.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-400" />;
        if (lowerCondition.includes('snow')) return <CloudSnow className="w-8 h-8 text-white" />;
        if (lowerCondition.includes('thunder')) return <CloudLightning className="w-8 h-8 text-yellow-500" />;
        if (lowerCondition.includes('clear')) return <Sun className="w-8 h-8 text-yellow-400" />;
        return <Cloud className="w-8 h-8 text-gray-400" />;
    };

    return (
        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center space-y-3 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors cursor-default animate-fade-in-up">
            <span className="text-slate-600 dark:text-slate-300 font-medium">{day}</span>
            <div className="transform transition-transform hover:scale-110 duration-200">
                {getWeatherIcon(condition)}
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-slate-900 dark:text-white">{Math.round(tempMax)}°</span>
                <span className="text-sm text-slate-400">{Math.round(tempMin)}°</span>
            </div>
        </div>
    );
});

export default ForecastCard;
