// Game state variables
let score = 0;
let lives = 3;
let correctColor = null;

// DOM elements
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const targetRgbDisplay = document.getElementById('target-rgb');
const colorOptionsContainer = document.getElementById('color-options');
const messageDisplay = document.getElementById('message');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const playAgainButton = document.getElementById('play-again');

// Initialize the game
function initGame() {
    score = 0;
    lives = 3;
    updateDisplays();
    gameOverScreen.style.display = 'none';
    generateNewRound();
}

// Generate a new round of color guessing
function generateNewRound() {
    // Clear previous options
    colorOptionsContainer.innerHTML = '';
    messageDisplay.textContent = '';
    
    // Generate random RGB color
    correctColor = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
    
    // Display the target RGB value
    targetRgbDisplay.textContent = `RGB(${correctColor.r}, ${correctColor.g}, ${correctColor.b})`;
    
    // Generate color options (including the correct one)
    const options = [correctColor];
    
    // Add 2 incorrect options
    for (let i = 0; i < 2; i++) {
        options.push({
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        });
    }
    
    // Shuffle the options
    shuffleArray(options);
    
    // Create color option elements
    options.forEach(color => {
        const option = document.createElement('div');
        option.className = 'color-option';
        option.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        
        option.addEventListener('click', () => handleColorClick(color));
        colorOptionsContainer.appendChild(option);
    });
}

// Handle color option clicks
function handleColorClick(color) {
    if (color.r === correctColor.r && 
        color.g === correctColor.g && 
        color.b === correctColor.b) {
        // Correct guess
        score++;
        messageDisplay.textContent = 'Correct!';
        messageDisplay.className = 'message correct';
    } else {
        // Incorrect guess
        lives--;
        messageDisplay.textContent = 'Wrong! Try again.';
        messageDisplay.className = 'message incorrect';
    }
    
    updateDisplays();
    
    // Check if game should continue
    if (lives <= 0) {
        endGame();
    } else {
        // Start new round after a short delay
        setTimeout(generateNewRound, 1000);
    }
}

// Update score and lives displays
function updateDisplays() {
    livesDisplay.textContent = `Lives: ${lives}`;
    scoreDisplay.textContent = `Score: ${score}`;
}

// End the game
function endGame() {
    finalScoreDisplay.textContent = score;
    gameOverScreen.style.display = 'flex';
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Event listener for play again button
playAgainButton.addEventListener('click', initGame);

// Start the game when the page loads
window.addEventListener('load', initGame);