import React from 'react';
import { Droplets, Wind, Gauge, Eye, Thermometer, Sunrise } from 'lucide-react';
import type { WeatherData } from '../../types';

interface WeatherDetailGridProps {
    weather: WeatherData;
}

const DetailCard = ({ icon, label, value, subValue }: { icon: React.ReactNode, label: string, value: string, subValue?: string }) => (
    <div className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center text-center hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
        <div className="mb-3 text-primary-500 dark:text-primary-400">
            {icon}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
        <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
        {subValue && <p className="text-xs text-slate-400 mt-1">{subValue}</p>}
    </div>
);

const WeatherDetailGrid: React.FC<WeatherDetailGridProps> = ({ weather }) => {
    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
        });
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <DetailCard
                icon={<Droplets className="w-6 h-6" />}
                label="Humidity"
                value={`${weather.main.humidity}%`}
            />
            <DetailCard
                icon={<Wind className="w-6 h-6" />}
                label="Wind Speed"
                value={`${weather.wind.speed} m/s`}
                subValue={`${weather.wind.deg}°`}
            />
            <DetailCard
                icon={<Gauge className="w-6 h-6" />}
                label="Pressure"
                value={`${weather.main.pressure} hPa`}
            />
            <DetailCard
                icon={<Eye className="w-6 h-6" />}
                label="Visibility"
                value={`${(weather.main.humidity / 1000).toFixed(1)} km`} // Mock calculation for example
            />
            <DetailCard
                icon={<Thermometer className="w-6 h-6" />}
                label="Feels Like"
                value={`${Math.round(weather.main.feels_like)}°`}
            />
            <DetailCard
                icon={<Sunrise className="w-6 h-6" />}
                label="Sunrise / Sunset"
                value={formatTime(weather.sys.sunrise)}
                subValue={`Sunset: ${formatTime(weather.sys.sunset)}`}
            />
        </div>
    );
};

export default WeatherDetailGrid;
