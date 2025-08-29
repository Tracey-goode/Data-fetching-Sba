async function fetchMarvelCharacters() {
      try {
        const response = await fetch('/api/marvel');
    const data = await response.json();
    const container = document.getElementById('results');
    container.innerHTML = '';