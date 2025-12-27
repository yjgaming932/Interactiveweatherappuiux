import { Cloud, CloudRain, Sun, CloudSnow, Wind } from 'lucide-react';
import { Card } from './ui/card';
import { motion } from 'motion/react';

interface DailyData {
  day: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
}

interface WeeklyForecastProps {
  days: DailyData[];
}

export function WeeklyForecast({ days }: WeeklyForecastProps) {
  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('rain')) return <CloudRain className="w-6 h-6 text-blue-500" />;
    if (lower.includes('cloud')) return <Cloud className="w-6 h-6 text-gray-500" />;
    if (lower.includes('snow')) return <CloudSnow className="w-6 h-6 text-blue-300" />;
    if (lower.includes('wind')) return <Wind className="w-6 h-6 text-gray-400" />;
    return <Sun className="w-6 h-6 text-yellow-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          7-Day Forecast
        </motion.h3>
        <div className="space-y-2">
          {days.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50, rotateX: -90 }}
              animate={{ opacity: 1, x: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.08,
                type: 'spring',
                stiffness: 100,
                damping: 12
              }}
              whileHover={{ 
                scale: 1.03, 
                x: 10,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer relative overflow-hidden"
            >
              {/* Animated background for today */}
              {day.day === 'Today' && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              <div className="flex items-center gap-4 flex-1 relative z-10">
                <motion.p
                  className={`w-20 ${day.day === 'Today' ? 'font-bold' : ''}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.08 + 0.1 }}
                >
                  {day.day}
                </motion.p>
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: index * 0.08 + 0.15,
                      type: 'spring',
                      stiffness: 200
                    }}
                  >
                    <motion.div
                      animate={{
                        y: day.condition.toLowerCase().includes('cloud') ? [0, -4, 0] : 0,
                        rotate: day.condition.toLowerCase().includes('sunny') ? [0, 360] : 0,
                      }}
                      transition={{
                        y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 },
                        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                      }}
                    >
                      {getWeatherIcon(day.condition)}
                    </motion.div>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 0.7, x: 0 }}
                    transition={{ delay: index * 0.08 + 0.2 }}
                    className="text-sm opacity-70 hidden sm:block"
                  >
                    {day.condition}
                  </motion.p>
                </div>
              </div>
              <div className="flex items-center gap-6 relative z-10">
                <div className="flex items-center gap-1">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-blue-400"
                    animate={{ 
                      scale: [1, 1.6, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: index * 0.15 
                    }}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.08 + 0.25 }}
                    className="text-sm text-blue-500 w-10"
                  >
                    {day.precipitation}%
                  </motion.p>
                </div>
                <div className="flex items-center gap-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: index * 0.08 + 0.3 }}
                    className="opacity-50"
                  >
                    {day.low}°
                  </motion.span>
                  <motion.div
                    className="w-16 h-1 bg-gradient-to-r from-blue-300 to-orange-400 rounded-full relative overflow-hidden"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ 
                      delay: index * 0.08 + 0.35, 
                      duration: 0.6,
                      type: 'spring',
                      stiffness: 100
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: index * 0.2,
                      }}
                    />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.08 + 0.4,
                      type: 'spring',
                      stiffness: 150
                    }}
                    className="font-medium"
                  >
                    {day.high}°
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}