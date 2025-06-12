document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const factDisplay = document.getElementById('fact-text');
    const sourceDisplay = document.getElementById('fact-source');
    const newFactBtn = document.getElementById('new-fact-btn');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorDisplay = document.getElementById('error-display');
    const errorMessage = document.querySelector('.error-message');
    const apiSelect = document.getElementById('api-select');
    
    // Initialize the app
    function init() {
        // Set up event listeners
        newFactBtn.addEventListener('click', fetchNewFact);
        
        // Fetch first fact automatically after a short delay
        setTimeout(() => {
            fetchNewFact();
        }, 500);
    }
    
    // Fetch a new fact based on the selected API
    async function fetchNewFact() {
        try {
            // Show loading, hide error and current fact
            loadingIndicator.classList.remove('hidden');
            errorDisplay.classList.add('hidden');
            factDisplay.classList.add('hidden');
            sourceDisplay.classList.add('hidden');
            
            // Disable button during fetch
            newFactBtn.disabled = true;
            
            const selectedApi = apiSelect.value;
            let fact, source;
            
            // Determine which API to use
            if (selectedApi === 'cat') {
                fact = await FactService.getCatFact();
                source = 'Cat Fact';
            } else if (selectedApi === 'joke') {
                fact = await FactService.getJoke();
                source = 'Joke';
            } else {
                // Randomly choose between cat fact and joke
                const randomChoice = Math.random() > 0.5 ? 'cat' : 'joke';
                if (randomChoice === 'cat') {
                    fact = await FactService.getCatFact();
                    source = 'Cat Fact';
                } else {
                    fact = await FactService.getJoke();
                    source = 'Joke';
                }
            }
            
            // Display the new fact
            displayFact(fact, source);
        } catch (error) {
            console.error('Error fetching fact:', error);
            showError('Failed to fetch a new fact. Please try again.');
        } finally {
            // Hide loading indicator and re-enable button
            loadingIndicator.classList.add('hidden');
            newFactBtn.disabled = false;
        }
    }
    
    // Display the fact with animation
    function displayFact(fact, source) {
        factDisplay.textContent = fact;
        sourceDisplay.textContent = `— ${source}`;
        
        // Remove hidden classes and add fade-in animation
        factDisplay.classList.remove('hidden');
        sourceDisplay.classList.remove('hidden');
        
        factDisplay.classList.add('fade-in');
        sourceDisplay.classList.add('fade-in');
        
        // Remove animation class after it completes to allow re-animation
        setTimeout(() => {
            factDisplay.classList.remove('fade-in');
            sourceDisplay.classList.remove('fade-in');
        }, 500);
    }
    
    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorDisplay.classList.remove('hidden');
        
        // Also show the default message in the fact display
        factDisplay.textContent = "Click 'New Fact' to get started!";
        factDisplay.classList.remove('hidden');
        sourceDisplay.classList.add('hidden');
    }
    
    // Initialize the app
    init();
});