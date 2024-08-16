//step 1: Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 98) + 2;

//step 2: Initialize variables
let turnCounter = 0;
let previousGuesses = [];
const maxTurns = 10;

// Selecting the input and button id from the HTML
const guessInput = document.getElementById('guessInput');
const submitButton = document.getElementById('submitButton');

// Link the feedback and previous guesses display
const feedback = document.getElementById('feedback');
const previousGuessesDisplay = document.getElementById('previousGuesses');

// Add event listener to the submitButton
submitButton.addEventListener('click', checkGuess);

//step 3: Create the checkGuess function
function checkGuess(event) {
    event.preventDefault(); // Prevent the form from submitting
    const userGuess = Number(guessInput.value);
    console.log(userGuess);
    guessInput.value=null

    // Validate the guess
    if (isNaN(userGuess) || userGuess < 2 || userGuess > 99) {
        feedback.textContent = "Please enter a number between 1 and 100!";
        feedback.style.color = 'red';
        return;
    }

    // Track the turn count and store the guess
    turnCounter++;
    previousGuesses.push(userGuess);
    previousGuessesDisplay.textContent = `Previous guesses: ${previousGuesses.join(', ')}`;

    // Compare the player's guess to the random number
    if (userGuess === randomNumber) {
        feedback.textContent = 'Congratulations, you guessed the right number!';
        feedback.style.color = 'green';
        endGame();
    } else if (userGuess < randomNumber) {
        feedback.textContent = 'Too low! Try again.';
        feedback.style.color = 'red';
    } else if (userGuess > randomNumber) {
        feedback.textContent = 'Too high! Try again.';
        feedback.style.color = 'red';
    }

    // Check if the player has run out of turns
    if (turnCounter >= maxTurns && userGuess !== randomNumber) {
        feedback.textContent = `Game over! The number was ${randomNumber}.`;
        feedback.style.color = 'red';
        endGame();
    }
}

// Step 5: End game and disable input
function endGame() {
    guessInput.disabled = true;
    submitButton.disabled = true;

    // Create a restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Start New Game';
    document.body.appendChild(restartButton);

    // Add event listener to the restart button
    restartButton.addEventListener('click', restartGame);
}

// Step 6: Restart game
function restartGame() {
    turnCounter = 0;
    previousGuesses = [];
    feedback.textContent = '';
    previousGuessesDisplay.textContent = 'Previous guesses: ';
    guessInput.disabled = false;
    submitButton.disabled = false;
    document.body.appendChild(submitButton);
    submitButton.style.color='gray';
    guessInput.value = '';
    guessInput.focus();
    

    // Generate a new random number
    randomNumber = Math.floor(Math.random() * 100) + 1;

    // Remove the restart button
    const restartButton = document.querySelector('button');
    restartButton.remove();

  
}
