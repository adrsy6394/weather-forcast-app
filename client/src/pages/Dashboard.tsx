
import Layout from '../components/layout/Layout';
import WeatherOverviewCard from '../components/weather/WeatherOverviewCard';
import WeatherDetailGrid from '../components/weather/WeatherDetailGrid';
import { useWeather } from '../context/WeatherContext';

const Dashboard = () => {
    const { weather, loading, error } = useWeather();

    if (loading) {
         return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh] text-red-500">
                    <p>{error}</p>
                </div>
            </Layout>
        );
    }

    if (!weather) {
         return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh] text-slate-500">
                    <p>Search for a city to see the weather.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-6">
                 {/* Top Bar - Simplified since Search is in Navbar */}
                <div className="mb-6">
                     <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                    <p className="text-slate-500 dark:text-slate-400">Current weather conditions</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <WeatherOverviewCard weather={weather} />
                    </div>
                    
                    <div className="lg:col-span-2">
                        <WeatherDetailGrid weather={weather} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
