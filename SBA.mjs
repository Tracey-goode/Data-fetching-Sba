const https = require('https');
const crypto = require('crypto');

// Marvel API keys
const publicKey = '864a968f01763b15293bd28f79504e64';
const privateKey = 'your_private_key_here';

// Create the timestamp and hash
const ts = new Date().getTime().toString();
const hash = crypto
    .createHash('md5')
    .update(ts + privateKey + publicKey)
    .digest('hex');



async function fetchMarvelCharacters() {
    try {
        const response = await fetch('/api/marvel');
        const data = await response.json();
        const container = document.getElementById('results');
        container.innerHTML = '';
        data.data.results.forEach(character => {
            const div = document.createElement('div');
            div.innerHTML = `
        <h3>${character.name}</h3>
        <img src="${character.thumbnail.path}.${character.thumbnail.extension}" width="100">`;
            container.appendChild(div);
        });
    } catch (err) {
        document.getElementById('results').innerText = 'Error loading characters.';
        console.error(err);
    }
}

fetchMarvelCharacters();