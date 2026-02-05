export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  pressure: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface ForecastDay {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface SearchResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface WeatherAPIResponse {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  timezone: number;
}

export interface ForecastAPIResponse {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
}

export interface GeocodingAPIResponse {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';