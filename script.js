import { WORDS } from "./words.js";

let points = 0
let level = 1

let count = 0
let solved = false;
let guesses = 1;
let currentGuess = [];
let nextLetter = 0;
let data = WORDS[count]
let rightGuessString = data[0]

// ------------------------- CREATE 1 ROW BOARD ------------------------- 
function initBoard() {
    //set text
    document.getElementById("guess1").textContent=data[1];
    document.getElementById("guess2").textContent=data[2];
    document.getElementById("guess3").textContent=data[3];
    document.getElementById("guess4").textContent=data[4];
    document.getElementById("guess5").textContent=data[5];

    //set hidden
    document.getElementById("newchal").style.display = "none";
    document.getElementById("guess1").style.display = "none";
    document.getElementById("guess2").style.display = "none";
    document.getElementById("guess3").style.display = "none";
    document.getElementById("guess4").style.display = "none";
    document.getElementById("guess5").style.display = "none";

    let board = document.getElementById("game-board");
    let row = document.createElement("div")
    row.className = "letter-row"
    for (let j = 0; j < rightGuessString.length; j++) {
        let box = document.createElement("div")
        box.className = "letter-box"
        row.appendChild(box)
    }
    board.appendChild(row)
}

// ------------------------- RESET ------------------------- 
function reset () {
    solved = false;
    guesses = 1;
    currentGuess = [];
    nextLetter = 0;
    data = WORDS[count]
    rightGuessString = data[0]

    document.getElementById("game-board").innerHTML = ""

    initBoard()
    level += 1
    document.getElementById("header").textContent = "Level: " + level + " | Clues | Points: " + points
}

// ------------------------- SHOW CLUES ------------------------- 
function showClue () {
    var x = document.getElementById("guess" + guesses);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    guesses += 1
}

// ------------------------- DELETE LETTER ------------------------- 
function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[0]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

// ------------------------- CHECK GUESS ------------------------- 
function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[0]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    //not enough letters in guess
    if (guessString.length != rightGuessString.length) {
        toastr.warning("Not enough letters!")
        animateCSS(row, "headShake")
        return
    }

    //guess is correct
    if (guessString === rightGuessString) {
        toastr.success("Correct!")
        
        for (const elem of document.getElementsByClassName("letter-box")) {
            elem.style.backgroundColor = 'green'
        }
        
        animateCSS(row, "bounce")
        document.getElementById("newchal").style.display = "block";

        points += 6 - guesses
        document.getElementById("header").textContent = "Level: " + level + " | Clues | Points: " + points
        count += 1
        solved = true
        return
    //guess is wrong
    } else {
        if (guesses <= 5) {
            showClue()
        }
        currentGuess = []
        toastr.warning("Incorrect Guess!")
        for (let j = 0; j < rightGuessString.length; j++) {
            deleteLetter()
            animateCSS(row, "flash")
        }
    }

    guessString = ''
}


// ------------------------- INSERT LETTER ------------------------- 
function insertLetter (pressedKey) {
    if (nextLetter === rightGuessString.length) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[0]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

// ------------------------- CSS ANIMATIONS ------------------------- 
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});




// ------------------------- KEY PRESSED -------------------------
document.addEventListener("keyup", (e) => {

    if (solved) {
        return
    }

    let pressedKey = String(e.key)

    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

// ------------------------- KEYBOARD PRESSED ------------------------- 
document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 


    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

document.getElementById("newchal").addEventListener("click", (e) => {
    reset();
})
document.getElementById("info").addEventListener("click", (e) => {
    toastr.info("Guess the right n-letter word with the given clues! The first guess is blind, subsequent guesses will reveal more clues!")
})
// ------------------------- INIT ------------------------- 
initBoard();