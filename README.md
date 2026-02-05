# Weather Dashboard

![Weather App Preview](https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1200&h=300&fit=crop&auto=format)

A beautiful, responsive weather application built with Next.js 16 that provides real-time weather conditions and a 5-day forecast for any location worldwide.

## Features

- 🔍 **Location Search** - Search for any city worldwide
- 🌡️ **Current Conditions** - Real-time temperature, humidity, wind speed, and more
- 📅 **5-Day Forecast** - Daily weather predictions with high/low temperatures
- 🌓 **Unit Toggle** - Switch between Celsius and Fahrenheit
- 📍 **Geolocation** - Use your current location for weather data
- 📱 **Responsive Design** - Works beautifully on all devices
- 🎨 **Dynamic Backgrounds** - Weather-appropriate gradient themes

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69845d0bfcd45d05267518d1&clone_repository=69845e28fcd45d05267519fd)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built as a standalone weather application using OpenWeatherMap API

### Code Generation Prompt

> Create a weather app that shows current conditions and 5-day forecast with location search

The app has been tailored to provide a complete weather experience with modern design and full functionality.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [OpenWeatherMap API](https://openweathermap.org/api) - Weather data provider

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- OpenWeatherMap API key (free tier available)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up environment variables (see below)
4. Run the development server:
   ```bash
   bun dev
   ```

### Environment Variables

Create a `.env.local` file with:

```env
OPENWEATHERMAP_API_KEY=your-api-key-here
```

Get your free API key at [OpenWeatherMap](https://openweathermap.org/api).

## API Integration

This app uses the OpenWeatherMap API for:
- Current weather data
- 5-day/3-hour forecast
- Geocoding for location search

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import project in Netlify
3. Set build command: `bun run build`
4. Add environment variables
5. Deploy!
<!-- README_END -->