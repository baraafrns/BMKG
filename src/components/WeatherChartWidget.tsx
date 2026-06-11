import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from './ThemeProvider';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

interface WeatherChartProps {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export function WeatherChartWidget({ daily }: WeatherChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Format data for daily chart (7 days)
  const data = daily.time.map((time, idx) => ({
    time: format(parseISO(time), 'EEE', { locale: id }), // e.g., Sen, Sel, Rab
    maxTemp: daily.temperature_2m_max[idx],
    minTemp: daily.temperature_2m_min[idx],
  }));

  return (
    <div className="w-full h-full min-h-[250px] flex flex-col">
      <h3 className="text-sm font-medium text-[#7C7A76] dark:text-[#A09E9A] mb-4">Tren Suhu Mingguan (°C)</h3>
      <div className="flex-1 w-full h-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMaxTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDark ? "#D2B48C" : "#A67B5B"} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={isDark ? "#D2B48C" : "#A67B5B"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#3A3834" : "#E8E4D9"} />
            <XAxis 
              dataKey="time" 
              tick={{ fill: isDark ? '#A09E9A' : '#7C7A76', fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              tick={{ fill: isDark ? '#A09E9A' : '#7C7A76', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#2C2A26' : '#F5F2EA',
                borderColor: isDark ? '#3A3834' : '#E8E4D9',
                borderRadius: '12px',
                color: isDark ? '#E8E4D9' : '#4A4A4A'
              }}
              formatter={(value: number, name: string) => [`${value}°C`, name === 'maxTemp' ? 'Suhu Maksimal' : 'Suhu Minimal']}
              labelFormatter={(label) => `Hari ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="maxTemp" 
              stroke={isDark ? "#D2B48C" : "#A67B5B"} 
              fillOpacity={1} 
              fill="url(#colorMaxTemp)" 
              strokeWidth={3}
            />
            <Area 
              type="monotone" 
              dataKey="minTemp" 
              stroke={isDark ? "#828282" : "#A09E9A"} 
              fillOpacity={0} 
              strokeDasharray="4 4"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
