import React, { useEffect, useState } from 'react';
import { BentoCard } from './components/BentoCard';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { WeatherWidget } from './components/WeatherWidget';
import { WeatherChartWidget } from './components/WeatherChartWidget';
import { WarningWidget } from './components/WarningWidget';
import { WeatherSkeleton, ChartSkeleton, WarningSkeleton } from './components/Skeletons';
import { EarthquakeWarning } from './types';
import GlobeWidget from './components/GlobeWidget';

function Dashboard() {
  const [weather, setWeather] = useState<any>(null);
  const [warning, setWarning] = useState<EarthquakeWarning | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [weatherRes, warningRes] = await Promise.all([
          fetch('/api/weather'),
          fetch('/api/warnings')
        ]);
        
        if (weatherRes.ok) setWeather(await weatherRes.json());
        if (warningRes.ok) setWarning(await warningRes.json());
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#E8E4D9] dark:bg-[#1C1B19] text-[#4A4A4A] dark:text-[#E8E4D9] transition-colors duration-500 font-sans selection:bg-[#A67B5B] selection:text-white pb-8">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pt-12 pb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#4A4A4A] dark:text-[#F5F2EA]">Nusantara</h1>
          <p className="text-sm sm:text-base text-[#7C7A76] dark:text-[#A09E9A] mt-1 font-medium">Sistem Pantauan Cuaca & Peringatan Dini</p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Bento Grid Layout */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
        
        {/* Weather Current - Span 12 md:4 */}
        <BentoCard className="md:col-span-4" delay={0.1}>
          {isLoading || !weather ? <WeatherSkeleton /> : <WeatherWidget current={weather.current} />}
        </BentoCard>

        {/* 3D Globe - Span 12 md:8 */}
        <BentoCard className="md:col-span-8 p-0 overflow-hidden" delay={0.2}>
          <div className="w-full h-full min-h-[300px] bg-[#2C2A26] relative">
             <GlobeWidget />
             <div className="absolute top-6 left-6 z-20 pointer-events-none">
               <h3 className="text-sm font-medium text-[#A09E9A]">Pantauan Satelit</h3>
               <p className="text-lg font-semibold text-[#E8E4D9]">Interaktif 3D</p>
             </div>
          </div>
        </BentoCard>

        {/* Chart Weekly Trend - Span 12 md:7 */}
        <BentoCard className="md:col-span-7" delay={0.3}>
          {isLoading || !weather ? <ChartSkeleton /> : <WeatherChartWidget daily={weather.daily} />}
        </BentoCard>

        {/* Early Warnings - Span 12 md:5 */}
        <BentoCard className="md:col-span-5" delay={0.4}>
          {isLoading ? <WarningSkeleton /> : <WarningWidget warning={warning} />}
        </BentoCard>

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-12 text-center">
        <p className="text-xs font-medium tracking-wide text-[#7C7A76] dark:text-[#7C7A76]">
          Data by BMKG & Open-Meteo • Crafted with precision.
        </p>
        <p className="text-xs font-medium text-[#A67B5B] dark:text-[#D2B48C] mt-1">
          Credit to @Baraafrns
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Dashboard />
    </ThemeProvider>
  );
}
