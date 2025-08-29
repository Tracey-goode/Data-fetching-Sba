function generateBS() {
    fetch('https://corporatebs-generator.sameerkumar.website/', {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => {
            const generatedBS = data.phrase;
            const bsTextElement = document.getElementById('generated-bs');
            bsTextElement.innerText = generatedBS;
        })
        .catch(err => {
            console.error('Error fetching Corporate BS:', err);
            const bsTextElement = document.getElementById('generated-bs');
            bsTextElement.innerText = 'Error loading BS. Please try again.';
        });
}

// Attach event listener to button
document.getElementById('generate-bs').addEventListener('click', generateBS);

// Generate BS on page load
generateBS();
