import React from 'react';
import { Cloud, Droplets, Wind, ThermometerSun } from 'lucide-react';

interface WeatherWidgetProps {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

export function WeatherWidget({ current }: WeatherWidgetProps) {
  // Mapping standard WMO weather codes to simple strings for UI
  const getWeatherDesc = (code: number) => {
    if (code === 0) return 'Cerah';
    if (code >= 1 && code <= 3) return 'Cerah Berawan';
    if (code >= 45 && code <= 48) return 'Berkabut';
    if (code >= 51 && code <= 67) return 'Hujan Ringan';
    if (code >= 71 && code <= 77) return 'Hujan Salju'; // Unlikely in Indonesia, but for completeness
    if (code >= 80 && code <= 82) return 'Hujan Lebat';
    if (code >= 95 && code <= 99) return 'Hujan Badai';
    return 'Berasap / Berawan';
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-[#7C7A76] dark:text-[#A09E9A]">Cuaca Saat Ini</h3>
          <p className="text-lg font-semibold text-[#4A4A4A] dark:text-[#E8E4D9]">DKI Jakarta</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#E8E4D9] dark:bg-[#34332F] flex items-center justify-center">
          <Cloud className="w-6 h-6 text-[#A67B5B] dark:text-[#D2B48C]" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 my-6">
        <span className="text-6xl font-bold tracking-tighter text-[#4A4A4A] dark:text-[#E8E4D9]">
          {Math.round(current.temperature_2m)}°
        </span>
        <span className="text-xl font-medium text-[#7C7A76] dark:text-[#A09E9A]">
          {getWeatherDesc(current.weather_code)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <div className="bg-[#E8E4D9] dark:bg-[#34332F] rounded-2xl p-4 flex items-center gap-3">
          <Droplets className="w-5 h-5 text-[#A67B5B] dark:text-[#D2B48C]" />
          <div>
            <p className="text-xs text-[#7C7A76] dark:text-[#A09E9A] uppercase tracking-wider font-semibold">Kelembapan</p>
            <p className="text-lg font-bold text-[#4A4A4A] dark:text-[#E8E4D9]">{current.relative_humidity_2m}%</p>
          </div>
        </div>
        
        <div className="bg-[#E8E4D9] dark:bg-[#34332F] rounded-2xl p-4 flex items-center gap-3">
          <Wind className="w-5 h-5 text-[#A67B5B] dark:text-[#D2B48C]" />
          <div>
            <p className="text-xs text-[#7C7A76] dark:text-[#A09E9A] uppercase tracking-wider font-semibold">Angin</p>
            <p className="text-lg font-bold text-[#4A4A4A] dark:text-[#E8E4D9]">{Math.round(current.wind_speed_10m)} km/j</p>
          </div>
        </div>
      </div>
    </div>
  );
}
