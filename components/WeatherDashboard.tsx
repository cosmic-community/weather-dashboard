'use client'

import { useState, useEffect } from 'react'
import type { WeatherData, ForecastDay, SearchResult, TemperatureUnit } from '@/types'
import SearchBar from './SearchBar'
import CurrentWeather from './CurrentWeather'
import ForecastCard from './ForecastCard'
import WeatherDetails from './WeatherDetails'

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unit, setUnit] = useState<TemperatureUnit>('celsius')
  const [selectedLocation, setSelectedLocation] = useState<SearchResult | null>(null)

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true)
    setError(null)

    try {
      const units = unit === 'celsius' ? 'metric' : 'imperial'
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}&units=${units}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }

      const data = await response.json()
      setWeather(data.current)
      setForecast(data.forecast)
    } catch (err) {
      setError('Unable to fetch weather data. Please try again.')
      console.error('Error fetching weather:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLocationSelect = (location: SearchResult) => {
    setSelectedLocation(location)
    fetchWeather(location.lat, location.lon)
  }

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude)
        },
        (err) => {
          setError('Unable to get your location. Please search for a city.')
          setLoading(false)
          console.error('Geolocation error:', err)
        }
      )
    } else {
      setError('Geolocation is not supported by your browser.')
    }
  }

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'))
  }

  // Refetch when unit changes
  useEffect(() => {
    if (selectedLocation) {
      fetchWeather(selectedLocation.lat, selectedLocation.lon)
    }
  }, [unit])

  // Load default location on mount
  useEffect(() => {
    // Default to London
    fetchWeather(51.5074, -0.1278)
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-shadow">
          Weather Dashboard
        </h1>
        
        <div className="flex items-center gap-4">
          {/* Unit Toggle */}
          <button
            onClick={toggleUnit}
            className="px-4 py-2 glass-card text-white font-medium hover:bg-white/20 transition-colors"
          >
            °{unit === 'celsius' ? 'C' : 'F'}
          </button>
          
          {/* Current Location Button */}
          <button
            onClick={handleUseCurrentLocation}
            className="px-4 py-2 glass-card text-white font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden sm:inline">My Location</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar onLocationSelect={handleLocationSelect} />
      </div>

      {/* Error State */}
      {error && (
        <div className="glass-card p-4 mb-8 text-red-200 text-center">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="glass-card p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          <p className="text-white mt-4">Loading weather data...</p>
        </div>
      )}

      {/* Weather Content */}
      {!loading && weather && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather */}
          <div className="lg:col-span-2">
            <CurrentWeather weather={weather} unit={unit} />
          </div>

          {/* Weather Details */}
          <div>
            <WeatherDetails weather={weather} unit={unit} />
          </div>

          {/* 5-Day Forecast */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold text-white mb-4 text-shadow">
              5-Day Forecast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {forecast.map((day) => (
                <ForecastCard key={day.date} forecast={day} unit={unit} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Data State */}
      {!loading && !weather && !error && (
        <div className="glass-card p-8 text-center">
          <p className="text-white text-lg">
            Search for a city or use your current location to see the weather.
          </p>
        </div>
      )}
    </div>
  )
}