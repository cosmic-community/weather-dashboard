import type { WeatherData, TemperatureUnit } from '@/types'

interface CurrentWeatherProps {
  weather: WeatherData
  unit: TemperatureUnit
}

export default function CurrentWeather({ weather, unit }: CurrentWeatherProps) {
  const getWeatherIconUrl = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`
  }

  const formatTime = (timestamp: number, timezone: number) => {
    const date = new Date((timestamp + timezone) * 1000)
    return date.toUTCString().slice(-12, -7)
  }

  return (
    <div className="glass-card p-6 md:p-8">
      {/* Location */}
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-shadow">
          {weather.location}
        </h2>
        <p className="text-white/70">{weather.country}</p>
      </div>

      {/* Main Weather Display */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={getWeatherIconUrl(weather.icon)}
            alt={weather.description}
            className="w-24 h-24 md:w-32 md:h-32 weather-icon"
          />
          <div>
            <div className="text-6xl md:text-7xl font-bold text-white text-shadow">
              {weather.temperature}°
              <span className="text-3xl">{unit === 'celsius' ? 'C' : 'F'}</span>
            </div>
            <p className="text-xl text-white/80 capitalize mt-1">
              {weather.description}
            </p>
          </div>
        </div>

        <div className="text-center md:text-right">
          <p className="text-white/70 text-sm">Feels like</p>
          <p className="text-3xl font-semibold text-white">
            {weather.feelsLike}°{unit === 'celsius' ? 'C' : 'F'}
          </p>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="mt-6 pt-6 border-t border-white/20 flex justify-center gap-8">
        <div className="flex items-center gap-2 text-white/80">
          <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L12 4M12 20L12 22M4 12L2 12M6.31 6.31L4.89 4.89M17.69 6.31L19.11 4.89M6.31 17.69L4.89 19.11M17.69 17.69L19.11 19.11M22 12L20 12M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <p className="text-xs text-white/60">Sunrise</p>
            <p className="font-medium">{formatTime(weather.sunrise, weather.timezone)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L12 4M12 20L12 22M4 12L2 12M6.31 6.31L4.89 4.89M17.69 6.31L19.11 4.89M6.31 17.69L4.89 19.11M17.69 17.69L19.11 19.11M22 12L20 12M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <p className="text-xs text-white/60">Sunset</p>
            <p className="font-medium">{formatTime(weather.sunset, weather.timezone)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}