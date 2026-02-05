import { NextRequest, NextResponse } from 'next/server'
import type { WeatherAPIResponse, ForecastAPIResponse, WeatherData, ForecastDay } from '@/types'

const API_KEY = process.env.OPENWEATHERMAP_API_KEY

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const units = searchParams.get('units') || 'metric'

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    )
  }

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  try {
    // Fetch current weather
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    )
    
    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data')
    }
    
    const weatherData: WeatherAPIResponse = await weatherResponse.json()

    // Fetch 5-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    )
    
    if (!forecastResponse.ok) {
      throw new Error('Failed to fetch forecast data')
    }
    
    const forecastData: ForecastAPIResponse = await forecastResponse.json()

    // Process current weather
    const currentWeather: WeatherData = {
      location: weatherData.name,
      country: weatherData.sys.country,
      temperature: Math.round(weatherData.main.temp),
      feelsLike: Math.round(weatherData.main.feels_like),
      humidity: weatherData.main.humidity,
      windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
      windDirection: weatherData.wind.deg,
      visibility: Math.round(weatherData.visibility / 1000), // Convert to km
      pressure: weatherData.main.pressure,
      description: weatherData.weather[0]?.description || 'Unknown',
      icon: weatherData.weather[0]?.icon || '01d',
      sunrise: weatherData.sys.sunrise,
      sunset: weatherData.sys.sunset,
      timezone: weatherData.timezone,
    }

    // Process 5-day forecast (get one entry per day at noon)
    const dailyForecasts: Map<string, ForecastDay> = new Map()
    
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000)
      const dateKey = date.toISOString().split('T')[0]
      
      if (!dateKey) return
      
      const existing = dailyForecasts.get(dateKey)
      
      if (!existing) {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const dayName = dayNames[date.getDay()] || 'Unknown'
        
        dailyForecasts.set(dateKey, {
          date: dateKey,
          dayName,
          tempMax: Math.round(item.main.temp_max),
          tempMin: Math.round(item.main.temp_min),
          description: item.weather[0]?.description || 'Unknown',
          icon: item.weather[0]?.icon || '01d',
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6),
        })
      } else {
        // Update min/max temperatures
        existing.tempMax = Math.max(existing.tempMax, Math.round(item.main.temp_max))
        existing.tempMin = Math.min(existing.tempMin, Math.round(item.main.temp_min))
      }
    })

    const forecast = Array.from(dailyForecasts.values()).slice(0, 5)

    return NextResponse.json({
      current: currentWeather,
      forecast,
    })
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}