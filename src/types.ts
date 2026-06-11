// Application types for BMKG API responses and App state

export interface EarthquakeWarning {
  Infogempa: {
    gempa: {
      Tanggal: string;
      Jam: string;
      DateTime: string;
      Coordinates: string;
      Lintang: string;
      Bujur: string;
      Magnitude: string;
      Kedalaman: string;
      Wilayah: string;
      Potensi: string;
      Dirasakan: string;
      Shakemap: string;
    }
  }
}

export interface WeatherDataPoint {
  datetime: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  conditionCode: string;
}

export interface AreaWeather {
  id: string;
  description: string; // city name
  latitude: number;
  longitude: number;
  forecasts: WeatherDataPoint[];
}
