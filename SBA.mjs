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