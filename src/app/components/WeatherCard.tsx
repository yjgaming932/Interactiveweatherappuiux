import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { Card } from './ui/card';
import { motion } from 'motion/react';

interface WeatherCardProps {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  feelsLike: number;
}

export function WeatherCard({
  temperature,
  condition,
  location,
  humidity,
  windSpeed,
  visibility,
  pressure,
  feelsLike
}: WeatherCardProps) {
  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('rain')) return <CloudRain className="w-24 h-24" />;
    if (lower.includes('cloud')) return <Cloud className="w-24 h-24" />;
    return <Sun className="w-24 h-24" />;
  };

  const getWeatherGradient = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('rain')) return 'from-gray-600 via-gray-700 to-slate-800';
    if (lower.includes('cloud')) return 'from-slate-500 via-slate-600 to-gray-700';
    if (lower.includes('sunny') || lower.includes('clear')) return 'from-orange-400 via-amber-500 to-yellow-500';
    return 'from-blue-500 to-blue-700'; // default partly cloudy
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <Card className={`p-8 bg-gradient-to-br ${getWeatherGradient(condition)} text-white border-0 overflow-hidden relative`}>
        {/* Animated background elements */}
        {condition.toLowerCase().includes('rain') && (
          <>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: -32,
                  height: `${20 + Math.random() * 20}px`,
                }}
                animate={{
                  y: [0, 1000],
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'linear',
                }}
              />
            ))}
            {/* Lightning effect */}
            <motion.div
              className="absolute inset-0 bg-white/10"
              animate={{
                opacity: [0, 0.3, 0, 0, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                times: [0, 0.1, 0.2, 0.3, 1],
              }}
            />
          </>
        )}

        {(condition.toLowerCase().includes('sunny') || condition.toLowerCase().includes('clear')) && (
          <>
            <motion.div
              className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Sun rays */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-20 bg-yellow-200/20 rounded-full"
                style={{
                  right: '10%',
                  top: '10%',
                  transformOrigin: '50% 150px',
                  rotate: `${i * 45}deg`,
                }}
                animate={{
                  scaleY: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </>
        )}

        {condition.toLowerCase().includes('cloud') && !condition.toLowerCase().includes('rain') && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/10 rounded-full blur-2xl"
                style={{
                  left: `${10 + i * 20}%`,
                  top: `${15 + (i % 2) * 20}%`,
                  width: `${80 + i * 20}px`,
                  height: `${40 + i * 10}px`,
                }}
                animate={{
                  x: [-30, 30, -30],
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
              />
            ))}
          </>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className="text-xl mb-2 opacity-90"
            >
              {location}
            </motion.h2>
            <div className="flex items-start gap-6">
              <div>
                <motion.div
                  key={temperature}
                  initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    type: 'spring',
                    stiffness: 200,
                    damping: 15
                  }}
                  className="text-7xl font-light"
                >
                  {temperature}°
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg mt-2 opacity-90"
                >
                  {condition}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm mt-1 opacity-75"
                >
                  Feels like {feelsLike}°
                </motion.p>
              </div>
              <motion.div
                className="mt-4 opacity-90"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                }}
                transition={{ 
                  delay: 0.3,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15
                }}
              >
                <motion.div
                  animate={{
                    rotate: condition.toLowerCase().includes('sunny') ? [0, 360] : 0,
                    y: condition.toLowerCase().includes('cloud') ? [0, -8, 0] : 0,
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  {getWeatherIcon(condition)}
                </motion.div>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            {[
              { icon: Droplets, label: 'Humidity', value: `${humidity}%`, delay: 0.5 },
              { icon: Wind, label: 'Wind', value: `${windSpeed} km/h`, delay: 0.6 },
              { icon: Eye, label: 'Visibility', value: `${visibility} km`, delay: 0.7 },
              { icon: Gauge, label: 'Pressure', value: `${pressure} mb`, delay: 0.8 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  delay: item.delay,
                  type: 'spring',
                  stiffness: 150
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 cursor-pointer"
              >
                <motion.div
                  animate={{
                    rotate: item.label === 'Wind' ? [0, 360] : 0,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                <div>
                  <p className="text-xs opacity-75">{item.label}</p>
                  <motion.p
                    key={item.value}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-medium"
                  >
                    {item.value}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}