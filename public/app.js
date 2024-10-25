async function fetchScores() {
    try {
        const response = await fetch('/scores'); // Calls your backend to get NBA live games
        const data = await response.json();
        displayNBAGames(data);
    } catch (error) {
        console.error('Error fetching NBA games:', error);
    }
}

function displayNBAGames(data) {
    const scoresDiv = document.getElementById('scores');
    scoresDiv.innerHTML = ''; // Clear any previous data

    if (data.games && data.games.length > 0) {
        data.games.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.innerHTML = `
                <h3>${game.away_team} vs ${game.home_team}</h3>
                <p><strong>Score:</strong> ${game.away_points} - ${game.home_points}</p>
                <p><strong>Status:</strong> ${game.status}</p>
                <p><strong>Date:</strong> ${game.date}</p>
                <p><strong>Venue:</strong> ${game.venue}</p>
            `;
            scoresDiv.appendChild(gameElement);
        });
    } else {
        scoresDiv.innerHTML = '<p>No live NBA games available.</p>';
    }
}

// Fetch the data when the page loads
window.onload = fetchScores;
