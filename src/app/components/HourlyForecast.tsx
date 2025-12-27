import { Cloud, CloudRain, Sun } from 'lucide-react';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { motion } from 'motion/react';

interface HourlyData {
  time: string;
  temperature: number;
  condition: string;
  precipitation: number;
}

interface HourlyForecastProps {
  hours: HourlyData[];
}

export function HourlyForecast({ hours }: HourlyForecastProps) {
  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('rain')) return <CloudRain className="w-6 h-6" />;
    if (lower.includes('cloud')) return <Cloud className="w-6 h-6" />;
    return <Sun className="w-6 h-6" />;
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
          Hourly Forecast
        </motion.h3>
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {hours.map((hour, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.08,
                  type: 'spring',
                  stiffness: 150,
                  damping: 12
                }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -10,
                  rotate: [0, -2, 2, 0],
                  transition: { 
                    y: { type: 'spring', stiffness: 300 },
                    rotate: { duration: 0.3 }
                  }
                }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 min-w-[80px] p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer relative"
              >
                {/* Highlight for "Now" */}
                {hour.time === 'Now' && (
                  <motion.div
                    className="absolute inset-0 bg-blue-500/10 rounded-lg"
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
                <motion.p
                  className="text-sm opacity-70 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: index * 0.08 + 0.1 }}
                >
                  {hour.time}
                </motion.p>
                <motion.div
                  className="text-blue-500 relative z-10"
                  animate={{
                    y: hour.condition.toLowerCase().includes('cloud') ? [0, -4, 0] : 0,
                    rotate: hour.condition.toLowerCase().includes('sunny') ? [0, 360] : 0,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 },
                    rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 },
                  }}
                >
                  {getWeatherIcon(hour.condition)}
                </motion.div>
                <motion.p
                  key={hour.temperature}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="font-medium relative z-10"
                >
                  {hour.temperature}°
                </motion.p>
                <div className="flex items-center gap-1 relative z-10">
                  <motion.div
                    className="w-1 h-1 rounded-full bg-blue-400"
                    animate={{ 
                      scale: [1, 1.8, 1], 
                      opacity: [0.4, 1, 0.4],
                      boxShadow: ['0 0 0px rgba(59, 130, 246, 0.5)', '0 0 8px rgba(59, 130, 246, 0.8)', '0 0 0px rgba(59, 130, 246, 0.5)']
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.1 
                    }}
                  />
                  <motion.p
                    className="text-xs text-blue-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.08 + 0.2 }}
                  >
                    {hour.precipitation}%
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </motion.div>
  );
}