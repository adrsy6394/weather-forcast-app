export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    bio?: string;
    location?: string;
}

export interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
    };
    name: string;
    dt: number;
}

export interface ForecastData {
    list: Array<{
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
        weather: Array<{
            main: string;
            description: string;
            icon: string;
        }>;
        wind: {
            speed: number;
        };
        dt_txt: string;
    }>;
    city: {
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        sunrise: number;
        sunset: number;
    };
}

export interface SearchHistoryItem {
    _id: string;
    city: string;
    temperature: number;
    condition: string;
    searchedAt: string;
}
