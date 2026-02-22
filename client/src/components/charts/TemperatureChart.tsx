import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ForecastData } from '../../types';

interface TemperatureChartProps {
    data: ForecastData['list'];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
    // Process data for the chart (taking first 8 items for roughly 24h forecast or similar)
    const chartData = data.slice(0, 8).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' }),
        temp: Math.round(item.main.temp),
    }));

    return (
        <div className="glass-card p-6 h-80 w-full animate-fade-in-up">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Temperature Trend</h3>
            <div className="h-full w-full pb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.2} />
                        <XAxis 
                            dataKey="time" 
                            stroke="#94a3b8" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                        />
                        <YAxis 
                            stroke="#94a3b8" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={(value) => `${value}°`}
                        />
                        <Tooltip
                            contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '12px',
                                color: '#1e293b'
                            }}
                            itemStyle={{ color: '#2563eb' }}
                            formatter={(value: number | undefined) => [`${value}°`, 'Temp'] as [string, string]}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="temp" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorTemp)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TemperatureChart;
