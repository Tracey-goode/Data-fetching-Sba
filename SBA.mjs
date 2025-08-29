const https = require('https');
const crypto = require('crypto');

// Marvel API keys
const publicKey = '864a968f01763b15293bd28f79504e64';
const privateKey = '8246929d53aca8824778f9bb52c426e0c4b26304';

// Create the timestamp and hash
const ts = new Date().getTime().toString();
const hash = crypto
    .createHash('md5')
    .update(ts + privateKey + publicKey)
    .digest('hex');

    // marvel seems to have very specific ways i need to request data
const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=5`;

https.get(url, (res) => {
    let data = '';

res.on('data', (chunk) => {
    data += chunk;
});

res.on('end', () => {
    const json = JSON.parse(data);
    const characters = json.data.results

    console.log('Marvel Characters:');
    characters.forEach((char) => {
      console.log(`- ${char.name}`);
    });
  });

}).on('error', (err) => {
  console.error('Error fetching data:', err.message);
});

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