import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'motion/react';

interface ChartData {
  time: string;
  temperature: number;
  feelsLike: number;
}

interface WeatherChartProps {
  data: ChartData[];
}

export function WeatherChart({ data }: WeatherChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <h3 className="mb-4">Temperature Trend</h3>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorTemp)"
                name="Temperature (°C)"
              />
              <Line
                type="monotone"
                dataKey="feelsLike"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Feels Like (°C)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mt-4 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-blue-500 rounded"></div>
            <span className="opacity-70">Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-slate-400 rounded border-dashed border-t-2 border-slate-400"></div>
            <span className="opacity-70">Feels Like</span>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}