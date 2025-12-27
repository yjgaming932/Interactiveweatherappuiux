import { useState } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { HourlyForecast } from './components/HourlyForecast';
import { WeeklyForecast } from './components/WeeklyForecast';
import { SearchBar } from './components/SearchBar';
import { WeatherChart } from './components/WeatherChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { motion, AnimatePresence } from 'motion/react';

// Mock data for different cities
const weatherData = {
  'San Francisco': {
    temperature: 18,
    condition: 'Partly Cloudy',
    location: 'San Francisco, CA',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    feelsLike: 16,
    hourly: [
      { time: 'Now', temperature: 18, condition: 'Partly Cloudy', precipitation: 10 },
      { time: '1 PM', temperature: 19, condition: 'Partly Cloudy', precipitation: 10 },
      { time: '2 PM', temperature: 20, condition: 'Sunny', precipitation: 5 },
      { time: '3 PM', temperature: 21, condition: 'Sunny', precipitation: 5 },
      { time: '4 PM', temperature: 20, condition: 'Sunny', precipitation: 5 },
      { time: '5 PM', temperature: 19, condition: 'Partly Cloudy', precipitation: 10 },
      { time: '6 PM', temperature: 17, condition: 'Cloudy', precipitation: 15 },
      { time: '7 PM', temperature: 16, condition: 'Cloudy', precipitation: 20 },
      { time: '8 PM', temperature: 15, condition: 'Cloudy', precipitation: 20 },
    ],
    daily: [
      { day: 'Today', high: 21, low: 14, condition: 'Partly Cloudy', precipitation: 10 },
      { day: 'Mon', high: 22, low: 15, condition: 'Sunny', precipitation: 5 },
      { day: 'Tue', high: 20, low: 14, condition: 'Cloudy', precipitation: 20 },
      { day: 'Wed', high: 19, low: 13, condition: 'Rainy', precipitation: 70 },
      { day: 'Thu', high: 18, low: 12, condition: 'Rainy', precipitation: 65 },
      { day: 'Fri', high: 20, low: 14, condition: 'Partly Cloudy', precipitation: 15 },
      { day: 'Sat', high: 22, low: 15, condition: 'Sunny', precipitation: 5 },
    ],
    chart: [
      { time: '6 AM', temperature: 14, feelsLike: 12 },
      { time: '9 AM', temperature: 16, feelsLike: 14 },
      { time: '12 PM', temperature: 18, feelsLike: 16 },
      { time: '3 PM', temperature: 21, feelsLike: 19 },
      { time: '6 PM', temperature: 17, feelsLike: 15 },
      { time: '9 PM', temperature: 15, feelsLike: 13 },
    ],
  },
  'New York': {
    temperature: 12,
    condition: 'Rainy',
    location: 'New York, NY',
    humidity: 85,
    windSpeed: 18,
    visibility: 6,
    pressure: 1010,
    feelsLike: 9,
    hourly: [
      { time: 'Now', temperature: 12, condition: 'Rainy', precipitation: 80 },
      { time: '1 PM', temperature: 13, condition: 'Rainy', precipitation: 75 },
      { time: '2 PM', temperature: 13, condition: 'Rainy', precipitation: 70 },
      { time: '3 PM', temperature: 14, condition: 'Cloudy', precipitation: 50 },
      { time: '4 PM', temperature: 14, condition: 'Cloudy', precipitation: 40 },
      { time: '5 PM', temperature: 13, condition: 'Cloudy', precipitation: 30 },
      { time: '6 PM', temperature: 12, condition: 'Cloudy', precipitation: 20 },
      { time: '7 PM', temperature: 11, condition: 'Cloudy', precipitation: 15 },
      { time: '8 PM', temperature: 10, condition: 'Cloudy', precipitation: 10 },
    ],
    daily: [
      { day: 'Today', high: 14, low: 9, condition: 'Rainy', precipitation: 80 },
      { day: 'Mon', high: 16, low: 10, condition: 'Cloudy', precipitation: 40 },
      { day: 'Tue', high: 18, low: 12, condition: 'Partly Cloudy', precipitation: 20 },
      { day: 'Wed', high: 20, low: 14, condition: 'Sunny', precipitation: 10 },
      { day: 'Thu', high: 22, low: 15, condition: 'Sunny', precipitation: 5 },
      { day: 'Fri', high: 21, low: 14, condition: 'Partly Cloudy', precipitation: 15 },
      { day: 'Sat', high: 19, low: 13, condition: 'Cloudy', precipitation: 30 },
    ],
    chart: [
      { time: '6 AM', temperature: 9, feelsLike: 6 },
      { time: '9 AM', temperature: 11, feelsLike: 8 },
      { time: '12 PM', temperature: 12, feelsLike: 9 },
      { time: '3 PM', temperature: 14, feelsLike: 11 },
      { time: '6 PM', temperature: 12, feelsLike: 9 },
      { time: '9 PM', temperature: 10, feelsLike: 7 },
    ],
  },
  'Tokyo': {
    temperature: 24,
    condition: 'Sunny',
    location: 'Tokyo, Japan',
    humidity: 55,
    windSpeed: 8,
    visibility: 15,
    pressure: 1015,
    feelsLike: 25,
    hourly: [
      { time: 'Now', temperature: 24, condition: 'Sunny', precipitation: 0 },
      { time: '1 PM', temperature: 25, condition: 'Sunny', precipitation: 0 },
      { time: '2 PM', temperature: 26, condition: 'Sunny', precipitation: 0 },
      { time: '3 PM', temperature: 27, condition: 'Sunny', precipitation: 5 },
      { time: '4 PM', temperature: 26, condition: 'Sunny', precipitation: 5 },
      { time: '5 PM', temperature: 25, condition: 'Partly Cloudy', precipitation: 10 },
      { time: '6 PM', temperature: 23, condition: 'Partly Cloudy', precipitation: 10 },
      { time: '7 PM', temperature: 22, condition: 'Partly Cloudy', precipitation: 10 },
      { time: '8 PM', temperature: 21, condition: 'Clear', precipitation: 5 },
    ],
    daily: [
      { day: 'Today', high: 27, low: 20, condition: 'Sunny', precipitation: 5 },
      { day: 'Mon', high: 28, low: 21, condition: 'Sunny', precipitation: 5 },
      { day: 'Tue', high: 27, low: 20, condition: 'Partly Cloudy', precipitation: 15 },
      { day: 'Wed', high: 26, low: 19, condition: 'Cloudy', precipitation: 30 },
      { day: 'Thu', high: 25, low: 18, condition: 'Cloudy', precipitation: 40 },
      { day: 'Fri', high: 26, low: 19, condition: 'Partly Cloudy', precipitation: 20 },
      { day: 'Sat', high: 27, low: 20, condition: 'Sunny', precipitation: 10 },
    ],
    chart: [
      { time: '6 AM', temperature: 20, feelsLike: 20 },
      { time: '9 AM', temperature: 22, feelsLike: 23 },
      { time: '12 PM', temperature: 24, feelsLike: 25 },
      { time: '3 PM', temperature: 27, feelsLike: 28 },
      { time: '6 PM', temperature: 23, feelsLike: 24 },
      { time: '9 PM', temperature: 21, feelsLike: 21 },
    ],
  },
};

export default function App() {
  const [currentCity, setCurrentCity] = useState<keyof typeof weatherData>('San Francisco');

  const handleSearch = (location: string) => {
    const city = location.trim();
    if (city in weatherData) {
      setCurrentCity(city as keyof typeof weatherData);
    } else {
      // Default to San Francisco if city not found
      alert(`Weather data for "${city}" not available. Showing San Francisco instead.`);
    }
  };

  const data = weatherData[currentCity];

  const getBackgroundGradient = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('rain')) return 'from-gray-300 via-slate-200 to-gray-300';
    if (lower.includes('cloud')) return 'from-slate-200 via-gray-100 to-slate-200';
    if (lower.includes('sunny') || lower.includes('clear')) return 'from-amber-100 via-orange-50 to-yellow-100';
    return 'from-slate-50 to-blue-50'; // default
  };

  return (
    <motion.div
      key={currentCity}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(data.condition)} p-4 md:p-8 transition-all duration-1000`}
    >
      {/* Animated background particles based on weather */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {data.condition.toLowerCase().includes('rain') && (
          <>
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 bg-blue-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: -20,
                  height: `${15 + Math.random() * 15}px`,
                }}
                animate={{
                  y: [0, window.innerHeight + 20],
                  opacity: [0, 1, 0.5],
                }}
                transition={{
                  duration: 0.4 + Math.random() * 0.3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'linear',
                }}
              />
            ))}
            {/* Ripples on ground */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`ripple-${i}`}
                className="absolute bottom-0 w-8 h-8 border-2 border-blue-300/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 2],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}

        {(data.condition.toLowerCase().includes('sunny') || data.condition.toLowerCase().includes('clear')) && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.2, 0.8, 0.2],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
            {/* Floating particles */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`float-${i}`}
                className="absolute w-1 h-1 bg-orange-200/50 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </>
        )}

        {data.condition.toLowerCase().includes('cloud') && !data.condition.toLowerCase().includes('rain') && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-gray-300/10 rounded-full blur-xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  width: `${100 + Math.random() * 100}px`,
                  height: `${50 + Math.random() * 50}px`,
                }}
                animate={{
                  x: [0, 100, 0],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              Weather Forecast
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-muted-foreground mt-1"
            >
              Stay updated with real-time weather information
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="w-full md:w-96"
          >
            <SearchBar onSearch={handleSearch} currentLocation={data.location} />
          </motion.div>
        </motion.div>

        {/* Quick City Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-2 flex-wrap"
        >
          {(Object.keys(weatherData) as Array<keyof typeof weatherData>).map((city, index) => (
            <motion.button
              key={city}
              onClick={() => setCurrentCity(city)}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentCity === city
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white hover:bg-gray-50 border'
              }`}
              whileHover={{ 
                scale: 1.1,
                y: -2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: 0.5 + index * 0.1,
                type: 'spring',
                stiffness: 150
              }}
            >
              <motion.span
                animate={currentCity === city ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {city}
              </motion.span>
            </motion.button>
          ))}
        </motion.div>

        {/* Main Weather Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`weather-${currentCity}`}
            initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: 15 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          >
            <WeatherCard {...data} />
          </motion.div>
        </AnimatePresence>

        {/* Tabs for different views */}
        <Tabs defaultValue="forecast" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
              <TabsTrigger value="hourly">Hourly</TabsTrigger>
              <TabsTrigger value="chart">Chart</TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="forecast" className="space-y-4 mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`forecast-${currentCity}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.4, type: 'spring' }}
              >
                <WeeklyForecast days={data.daily} />
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="hourly" className="space-y-4 mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`hourly-${currentCity}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.4, type: 'spring' }}
              >
                <HourlyForecast hours={data.hourly} />
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="chart" className="space-y-4 mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`chart-${currentCity}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.4, type: 'spring' }}
              >
                <WeatherChart data={data.chart} />
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-muted-foreground pt-8"
        >
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Weather data updates every hour • Last updated: {new Date().toLocaleTimeString()}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}