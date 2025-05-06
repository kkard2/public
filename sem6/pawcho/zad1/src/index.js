import express from 'express';
import logger from './logger.js';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
const AUTHOR = 'Karol Kasperek';
const weatherApiKey = process.env.WEATHER_API_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    if (!weatherApiKey) {
        logger.error('Brak klucza API');
        return res.status(500).send({ error: 'Brak klucza API' });
    }
    if (!city) return res.status(400).send({ error: 'Brak miasta' });

    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`);
        res.json(response.data);
    } catch (err) {
        logger.error(err.message);
        res.status(500).send({ error: 'Błąd pobierania pogody' });
    }
});

app.listen(PORT, () => {
    const startInfo = `Aplikacja uruchomiona: autor: ${AUTHOR}, port: ${PORT}`;
    logger.info(startInfo);
});
