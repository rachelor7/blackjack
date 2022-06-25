var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck = [];

// allows player to draw while player sum <= 21
let canHit = true;

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
};

const buildDeck = () => {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  let types = ["C", "H", "D", "S"];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]);
    }
  }
  console.log("unshuffled deck", deck);
};

const shuffleDeck = () => {
  for (let i = 0; i < deck.length; i++) {
    // Math.random() => 0-1
    // Math.floor() gets rid if decimal place (truncates it)
    // Will generate a number b/t 0-51.9999 => 0-51
    let j = Math.floor(Math.random() * deck.length);

    // swap positions
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log("shuffled deck", deck);
};

const startGame = () => {
  // dealer hand
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);

  // console.log("hidden card", hidden);
  // console.log("dealer sum", dealerSum);

  // deal cards for dealer rule: must deal if dealerSum <17
  while (dealerSum < 17) {
    // create image tag <img>
    let cardImg = document.createElement("img");
    // grab card from dec
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    // increment
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    // append img to div element with id 'dealer-cards'
    document.getElementById("dealer-cards").append(cardImg);
  }
  console.log("dealer sum", dealerSum);

  // your hand
  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    // grab card from dec
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    // increment
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    // append img to div element with id 'dealer-cards'
    document.getElementById("your-cards").append(cardImg);
  }
  console.log("your sum", yourSum);

  document.getElementById("hit").addEventListener("click", hit);
};

const hit = () => {
  if (!canHit) return;
  let cardImg = document.createElement("img");
  // grab card from dec
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  // increment
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  // append img to div element with id 'dealer-cards'
  document.getElementById("your-cards").append(cardImg);
};

const getValue = (card) => {
  let data = card.split("-"); // ie 4-C ["4", "C"]
  let value = data[0];

  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
};

const checkAce = (card) => {
  // card is string, check to see if first letter is A
  if (card[0] == "A") {
    return 1;
  }
  return 0;
};
