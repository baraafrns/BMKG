import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  const BMKG_EARTHQUAKE_URL = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json';
  
  // Using Open-Meteo for local Indonesian locations because BMKG XML endpoint is currently blocked by HTML splash.
  // We'll simulate the response format to maintain the dashboard experience.
  const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-6.2088&longitude=106.8456&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FJakarta';

  // API to fetch earthquake / early warnings
  app.get('/api/warnings', async (req, res) => {
    try {
      const response = await fetch(BMKG_EARTHQUAKE_URL);
      if (!response.ok) throw new Error('Failed to fetch from BMKG');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching warnings:', error);
      res.status(500).json({ error: 'Failed to fetch early warnings' });
    }
  });

  // API to forecast data (DKI Jakarta coordinates as default)
  app.get('/api/weather', async (req, res) => {
    try {
      const response = await fetch(OPEN_METEO_URL);
      if (!response.ok) throw new Error('Failed to fetch weather data');
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
