
import Layout from '../components/layout/Layout';
import OpenLayerMap from '../components/map/OpenLayerMap';
import { useWeather } from '../context/WeatherContext';

const MapView = () => {
    const { weather, loading } = useWeather();
    
    return (
        <Layout>
            <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
                 <div className="mb-6">
                     <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Global Weather Map</h1>
                    <p className="text-slate-500 dark:text-slate-400">Interactive view of weather conditions</p>
                </div>

                <div className="flex-1 w-full bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                    {loading && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
                        </div>
                    )}
                    
                    {weather && weather.coord ? (
                        <div className="w-full h-full">
                            <OpenLayerMap 
                                lat={weather.coord.lat}
                                lon={weather.coord.lon}
                                cityName={weather.name}
                                temperature={weather.main.temp}
                                condition={weather.weather[0].main}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-400">
                            Search for a city to view on map
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default MapView;
