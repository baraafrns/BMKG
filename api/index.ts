import express from 'express';

const app = express();

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-6.2088&longitude=106.8456&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FJakarta';
const BMKG_EARTHQUAKE_URL = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json';

// Tambahkan middleware CORS jika diperlukan saat testing local vs vercel
app.use(express.json());

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

// Penting: Export app express agar dikenali sebagai Serverless Function oleh Vercel
export default app;
