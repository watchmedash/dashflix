let words = [];
let currentWord = '';
let currentRow = 0;
let currentTile = 0;
let gameOver = false;
let practiceMode = false;

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['BACK', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER']
];

function getTodayDateKey() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function getDayNumber() {
    const startDate = new Date(2025, 0, 1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
}

async function loadWords() {
    try {
        const response = await fetch('words.json');
        const data = await response.json();
        words = data.words;
        currentWord = getDailyWord();
        console.log('Game loaded! Total words:', words.length);
    } catch (error) {
        console.error('Error loading words:', error);
        showMessage('Error loading game. Please refresh.', 'error');
    }
}

function getDailyWord() {
    const dayNumber = getDayNumber();
    const wordIndex = dayNumber % words.length;

    document.getElementById('dayNumber').textContent = `Day #${dayNumber + 1}`;

    return words[wordIndex].toUpperCase();
}

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].toUpperCase();
}

function isValidWord(word) {
    return words.includes(word.toLowerCase());
}

function saveGameState() {
    if (practiceMode) return;

    const gameState = {
        date: getTodayDateKey(),
        dayNumber: getDayNumber(),
        currentRow: currentRow,
        currentTile: currentTile,
        gameOver: gameOver,
        boardState: [],
        keyboardState: {}
    };

    for (let i = 0; i < MAX_GUESSES; i++) {
        const rowState = [];
        for (let j = 0; j < WORD_LENGTH; j++) {
            const tile = document.querySelector(`[data-row="${i}"][data-tile="${j}"]`);
            rowState.push({
                letter: tile.textContent,
                status: tile.classList.contains('correct') ? 'correct' :
                       tile.classList.contains('present') ? 'present' :
                       tile.classList.contains('absent') ? 'absent' : ''
            });
        }
        gameState.boardState.push(rowState);
    }

    document.querySelectorAll('.key').forEach(key => {
        const letter = key.getAttribute('data-key');
        if (letter && letter.length === 1) {
            gameState.keyboardState[letter] =
                key.classList.contains('correct') ? 'correct' :
                key.classList.contains('present') ? 'present' :
                key.classList.contains('absent') ? 'absent' : '';
        }
    });

    localStorage.setItem('wordleGameState', JSON.stringify(gameState));
}

function loadGameState() {
    const savedState = localStorage.getItem('wordleGameState');

    if (!savedState) return false;

    try {
        const gameState = JSON.parse(savedState);

        if (gameState.date !== getTodayDateKey()) {
            localStorage.removeItem('wordleGameState');
            return false;
        }

        currentRow = gameState.currentRow;
        currentTile = gameState.currentTile;
        gameOver = gameState.gameOver;

        gameState.boardState.forEach((rowState, rowIndex) => {
            rowState.forEach((tileState, tileIndex) => {
                const tile = document.querySelector(`[data-row="${rowIndex}"][data-tile="${tileIndex}"]`);
                if (tileState.letter) {
                    tile.textContent = tileState.letter;
                    tile.classList.add('filled');
                }
                if (tileState.status) {
                    tile.classList.add(tileState.status);
                }
            });
        });

        Object.keys(gameState.keyboardState).forEach(letter => {
            const key = document.querySelector(`[data-key="${letter}"]`);
            if (key && gameState.keyboardState[letter]) {
                key.classList.add(gameState.keyboardState[letter]);
            }
        });

        if (gameOver) {
            const lastRowGuess = gameState.boardState[currentRow]
                .map(tile => tile.letter)
                .join('');

            if (lastRowGuess === currentWord) {
                showGameOverButtons('Completed!', 'success');
            } else {
                showGameOverButtons(`Word was: ${currentWord}`, 'error');
            }
        }

        return true;
    } catch (error) {
        console.error('Error loading game state:', error);
        localStorage.removeItem('wordleGameState');
        return false;
    }
}

function showGameOverButtons(message, type) {
    const messageDiv = document.getElementById('message');

    const buttonText = practiceMode ? 'Next Word' : 'Practice Mode';
    const buttonIcon = practiceMode ? 'fa-forward' : 'fa-play';

    messageDiv.innerHTML = `
        <div class="game-over-message ${type}">${message}</div>
        <div class="game-over-buttons">
            <button class="action-btn" onclick="startPracticeMode()">
                <i class="fas ${buttonIcon}"></i> ${buttonText}
            </button>
        </div>
    `;
}

// Start practice mode
function startPracticeMode() {
    practiceMode = true;
    currentWord = getRandomWord();
    currentRow = 0;
    currentTile = 0;
    gameOver = false;

    document.getElementById('dayNumber').textContent = 'Practice Mode';

    document.querySelectorAll('.tile').forEach(tile => {
        tile.textContent = '';
        tile.className = 'tile';
    });

    document.querySelectorAll('.key').forEach(key => {
        key.classList.remove('correct', 'present', 'absent');
    });

    document.getElementById('message').innerHTML = '';

    console.log('Practice mode started! Word:', currentWord);
}

function initBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';

    for (let i = 0; i < MAX_GUESSES; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < WORD_LENGTH; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.setAttribute('data-row', i);
            tile.setAttribute('data-tile', j);
            row.appendChild(tile);
        }

        board.appendChild(row);
    }
}

function initKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';

    keys.forEach(row => {
        const keyboardRow = document.createElement('div');
        keyboardRow.classList.add('keyboard-row');

        row.forEach(key => {
            const button = document.createElement('button');
            button.classList.add('key');
            button.setAttribute('data-key', key);

            // Use icon for BACK key
            if (key === 'BACK') {
                button.innerHTML = '<i class="fas fa-backspace"></i>';
            } else {
                button.textContent = key;
            }

            if (key === 'ENTER' || key === 'BACK') {
                button.classList.add('wide');
            }

            button.addEventListener('click', () => handleKeyPress(key));
            keyboardRow.appendChild(button);
        });

        keyboard.appendChild(keyboardRow);
    });
}

function handleKeyPress(key) {
    if (gameOver) return;

    if (key === 'ENTER') {
        submitGuess();
    } else if (key === 'BACK') {
        deleteLetter();
    } else {
        addLetter(key);
    }
}

function addLetter(letter) {
    if (currentTile < WORD_LENGTH) {
        const tile = document.querySelector(`[data-row="${currentRow}"][data-tile="${currentTile}"]`);
        tile.textContent = letter;
        tile.classList.add('filled');
        currentTile++;
        saveGameState();
    }
}

function deleteLetter() {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.querySelector(`[data-row="${currentRow}"][data-tile="${currentTile}"]`);
        tile.textContent = '';
        tile.classList.remove('filled');
        saveGameState();
    }
}

function submitGuess() {
    if (currentTile < WORD_LENGTH) {
        showMessage('Not enough letters', 'error');
        return;
    }

    const guess = getCurrentGuess();

    if (!isValidWord(guess)) {
        showMessage('Not in word list', 'error');
        return;
    }

    checkGuess(guess);

    if (guess === currentWord) {
        gameOver = true;
        saveGameState();
        showGameOverButtons('Congratulations!', 'success');
    } else if (currentRow === MAX_GUESSES - 1) {
        gameOver = true;
        saveGameState();
        showGameOverButtons(`Game Over! Word was: ${currentWord}`, 'error');
    } else {
        currentRow++;
        currentTile = 0;
        saveGameState();
    }
}

function getCurrentGuess() {
    let guess = '';
    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = document.querySelector(`[data-row="${currentRow}"][data-tile="${i}"]`);
        guess += tile.textContent;
    }
    return guess;
}

function checkGuess(guess) {
    const letterCount = {};

    for (let letter of currentWord) {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    const status = Array(WORD_LENGTH).fill('absent');

    for (let i = 0; i < WORD_LENGTH; i++) {
        if (guess[i] === currentWord[i]) {
            status[i] = 'correct';
            letterCount[guess[i]]--;
        }
    }

    for (let i = 0; i < WORD_LENGTH; i++) {
        if (status[i] === 'absent' && letterCount[guess[i]] > 0) {
            status[i] = 'present';
            letterCount[guess[i]]--;
        }
    }

    for (let i = 0; i < WORD_LENGTH; i++) {
        const tile = document.querySelector(`[data-row="${currentRow}"][data-tile="${i}"]`);

        setTimeout(() => {
            tile.classList.add(status[i]);
            updateKeyboard(guess[i], status[i]);

            if (i === WORD_LENGTH - 1) {
                setTimeout(() => saveGameState(), 100);
            }
        }, i * 200);
    }
}

function updateKeyboard(letter, status) {
    const key = document.querySelector(`[data-key="${letter}"]`);
    if (!key) return;

    const currentStatus = key.classList.contains('correct') ? 'correct' :
                         key.classList.contains('present') ? 'present' : 'absent';

    if (status === 'correct' || (status === 'present' && currentStatus !== 'correct')) {
        key.classList.remove('absent', 'present', 'correct');
        key.classList.add(status);
    } else if (status === 'absent' && currentStatus !== 'correct' && currentStatus !== 'present') {
        key.classList.add('absent');
    }
}

function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = `message ${type}`;

    setTimeout(() => {
        message.textContent = '';
        message.className = 'message';
    }, 2000);
}

document.addEventListener('keydown', (e) => {
    if (gameOver) return;

    const key = e.key.toUpperCase();

    if (key === 'ENTER') {
        handleKeyPress('ENTER');
    } else if (key === 'BACKSPACE') {
        handleKeyPress('BACK');
    } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
    }
});

async function init() {
    await loadWords();
    currentWord = getDailyWord();
    initBoard();
    initKeyboard();

    const stateLoaded = loadGameState();

    if (stateLoaded) {
        console.log('Game state restored from previous session');
    }
}

init();
