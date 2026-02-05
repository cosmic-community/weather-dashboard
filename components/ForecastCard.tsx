import type { ForecastDay, TemperatureUnit } from '@/types'

interface ForecastCardProps {
  forecast: ForecastDay
  unit: TemperatureUnit
}

export default function ForecastCard({ forecast, unit }: ForecastCardProps) {
  const getWeatherIconUrl = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  }

  return (
    <div className="glass-card p-4 text-center hover:bg-white/20 transition-colors">
      <p className="text-white/80 font-medium mb-2">{forecast.dayName}</p>
      <img
        src={getWeatherIconUrl(forecast.icon)}
        alt={forecast.description}
        className="w-16 h-16 mx-auto weather-icon"
      />
      <p className="text-xs text-white/60 capitalize mb-2 truncate">
        {forecast.description}
      </p>
      <div className="flex justify-center items-center gap-2">
        <span className="text-white font-semibold">
          {forecast.tempMax}°
        </span>
        <span className="text-white/60">
          {forecast.tempMin}°
        </span>
      </div>
    </div>
  )
}