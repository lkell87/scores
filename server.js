const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 4000;

// Your SportsData.io API key
const sportsDataApiKey = '2c251316ab7b466299c40b60addd3dc5';

app.use(express.static('public'));

app.get('/nba-scores', async (req, res) => {
    try {
        const date = req.query.date || '2024-10-23'; // Default to a date if not provided
        const url = `https://api.sportsdata.io/v3/nba/scores/json/ScoresBasicFinal/${date}?key=${sportsDataApiKey}`;
        const response = await axios.get(url);
        const games = response.data;

        res.json(games);
    } catch (error) {
        console.error('Error fetching NBA scores:', error.message);
        res.status(500).json({ message: 'Error fetching NBA scores', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
