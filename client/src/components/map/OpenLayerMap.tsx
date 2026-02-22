import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import { CloudSun } from 'lucide-react';

interface OpenLayerMapProps {
    lat: number;
    lon: number;
    cityName?: string;
    temperature?: number;
    condition?: string;
}

const OpenLayerMap: React.FC<OpenLayerMapProps> = ({ lat, lon, cityName, temperature, condition }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<Map | null>(null);
    const markerLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

    // Initialize Map
    useEffect(() => {
        if (!mapRef.current) return;

        // Create Marker Layer
        const markerSource = new VectorSource();
        const markerLayer = new VectorLayer({
            source: markerSource,
            style: new Style({
                image: new Circle({
                    radius: 8,
                    fill: new Fill({ color: '#3b82f6' }),
                    stroke: new Stroke({ color: '#ffffff', width: 2 }),
                }),
            }),
        });
        markerLayerRef.current = markerLayer;

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                markerLayer,
            ],
            view: new View({
                center: fromLonLat([lon, lat]),
                zoom: 10,
            }),
            // Removed controls: [] to enable default zoom controls
        });

        mapInstance.current = map;

        return () => {
            map.setTarget(undefined);
            mapInstance.current = null;
        };
    }, []); // Run once on mount

    // Update View and Marker when props change
    useEffect(() => {
        if (!mapInstance.current || !markerLayerRef.current) return;

        const view = mapInstance.current.getView();
        
        // Gentle re-centering only when coordinates significantly change
        // or a search triggers this. Using animate for smooth transition.
        view.animate({
            center: fromLonLat([lon, lat]),
            duration: 1000,
            zoom: view.getZoom() || 10 // Maintain current zoom if user has zoomed
        });

        // Update Marker position
        const source = markerLayerRef.current.getSource();
        if (source) {
            source.clear();
            const marker = new Feature({
                geometry: new Point(fromLonLat([lon, lat])),
            });
            source.addFeature(marker);
        }
    }, [lat, lon]);

    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden glass-card shadow-lg">
            <div ref={mapRef} className="w-full h-full" />
            
            {/* Floating Weather Info Card Overlay */}
            {(cityName && temperature !== undefined) && (
                <div className="absolute top-4 right-4 glass-panel p-3 rounded-lg flex items-center space-x-3 text-slate-900 animate-fade-in-up z-10">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                         <CloudSun size={16} />
                    </div>
                    <div>
                        <p className="text-xs font-bold dark:text-white">{cityName}</p>
                        <p className="text-sm dark:text-slate-200">{Math.round(temperature)}° {condition}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OpenLayerMap;
