import { useMemo } from 'react';
import Layout from '../components/layout/Layout';
import TemperatureChart from '../components/charts/TemperatureChart';
import ForecastCard from '../components/weather/ForecastCard';
import WeatherOverviewCard from '../components/weather/WeatherOverviewCard';
import { useWeather } from '../context/WeatherContext';

const Forecast = () => {
    const { weather, forecast, loading, error } = useWeather();

    // Process forecast data to get daily summaries
    const dailyForecast = useMemo(() => {
        if (!forecast) return [];
        
        const daily: any[] = [];
        const seenDates = new Set();

        forecast.list.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            if (!seenDates.has(date)) {
                seenDates.add(date);
                daily.push({
                    day: date,
                    max: item.main.temp_max,
                    min: item.main.temp_min,
                    condition: item.weather[0].main
                });
            }
        });
        return daily.slice(0, 5); // Just take 5 days
    }, [forecast]);

    if (loading) return <Layout><div className="flex justify-center p-10">Loading...</div></Layout>;
    if (error) return <Layout><div className="flex justify-center p-10 text-red-500">{error}</div></Layout>;
    if (!weather || !forecast) return <Layout><div className="flex justify-center p-10">No data available</div></Layout>;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-8">
                 <div className="mb-6">
                     <h1 className="text-2xl font-bold text-slate-900 dark:text-white">5-Day Forecast</h1>
                    <p className="text-slate-500 dark:text-slate-400">Weather predictions for {weather.name}</p>
                </div>

                {/* Top Section: Overview & Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <WeatherOverviewCard weather={weather} />
                    <TemperatureChart data={forecast.list} />
                </div>

                {/* Daily Forecast Grid */}
                <div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Daily Outlook</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {dailyForecast.map((day, index) => (
                            <ForecastCard
                                key={index}
                                day={day.day}
                                tempMax={day.max}
                                tempMin={day.min}
                                condition={day.condition}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Forecast;
