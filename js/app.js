/// Create a list that holds all of your cards
const allCards = [
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb"
];

// Declaring variables 
const cardDeck = document.querySelector(".deck");
const stars = document.querySelectorAll(".fa-star");
const ratingContainer = document.querySelector(".stars");
let openedCards = [];
let matchedCards = [];

/// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/// Function to start new game play
function startGame() {
  
  // Shuffle deck of cards
  cards = shuffle(allCards);
  
  for (let i = 0; i < allCards.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class= "${allCards[i]}"> </i>`;
    cardDeck.appendChild(card);

    // Add click event to each card
    click(card);
  }
}

/// Click function 
function click(card) {
  
  // Click event listener
  card.addEventListener("click", function() {
    const currentCard = this;
    const previousCard = openedCards[0];
    
    // Click to open card
    if (openedCards.length === 1) {
      card.classList.add("open", "show", "disable");
      openedCards.push(this);
      
      // Compare two opened cards
      compare(currentCard, previousCard);
    } else {
      
      // Unopened cards
      currentCard.classList.add("open", "show", "disable");
      openedCards.push(this);
    }
  });
}

/// Compare two cards for a match
function compare(currentCard, previousCard) {
  
  // Matched cards
  if (currentCard.innerHTML === previousCard.innerHTML) {
    currentCard.classList.add("match");
    previousCard.classList.add("match");
    matchedCards.push(currentCard, previousCard);
    openedCards = [];
    
    // Checks if the game is over
    isOver();
  } else {
    
    // Turn card to blank in set time
    setTimeout(function() {
      currentCard.classList.remove("open", "show");
      previousCard.classList.remove("open", "show");
      openedCards = [];
    }, 250);
  }

  // Add a move to the counter
  addMove();
}

// End game
function isOver() {
  if (matchedCards.length === allCards.length) {
    clearInterval(interval);
    alert("Congratulations! You have matched all the cards.");
  }
}

/// Game timer
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins - "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
    },1000);
}  


/// Move counter
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;
  
  // Start timer after first move
  if (moves === 1){
    startTimer();
  }
    
  // Rating based on amount of moves
  if (moves > 14 && moves < 18){
    for( i= 0; i < 3; i++){
      if(i > 1){
        stars[i].style.visibility = "collapse";
            }
        }
    }
  else if (moves > 22){
    for( i= 0; i < 3; i++){
      if(i > 0){
        stars[i].style.visibility = "collapse";
            }
        }
    }
}


/// Setup restart button
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {
  
  // Turning cards to blank
  cardDeck.innerHTML = "";
  
  // Reset the game
  startGame();
  
  // Reset any variables
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  ratingContainer.innerHTML = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
  
  //Reset the timer
  var timer = document.querySelector(".timer");
  second = 0;
  minute = 0; 
  timer.innerHTML = "0 mins - 0 secs";
  clearInterval(interval);
  
});

/// Replay the game
startGame();

