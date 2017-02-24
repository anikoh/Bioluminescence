


// Global variables for game elements. Players, target, enemies, background characters

  var player1 = {
    name: "Player 1",
    col: 0,
    row: 0,
    image: "img/bluefish.png"
  }

  var player2 = {
    name: "Player 2",
    col: 0,
    row: 0,
    image: "img/stripeyfish.png"
  }

var elements =[

  target1 = {
    col: 0,
    row: 0,
    image: "img/starfish.jpg"
  },

  enemy1 = {
    col: 0,
    row: 0,
    image: "img/octopus.png"
  },

  enemy2 = {
    col: 0,
    row: 0,
    image: "img/octopus.png"
  },

  enemy3 = {
    col: 0,
    row: 0,
    image: "img/octopus.png"
  },
]



backgroundChars = [
  plant1 = {
    col: 0,
    row: 0,
    image: "img/plant.jpg"
  },

  plant2 = {
    col: 0,
    row: 0,
    image: "img/jellyfish.jpg"
  },

  plant3 = {
    col: 0,
    row: 0,
    image: "img/jellyfish2.jpg"
  }
];

var boardCol=12;
var boardRow=9;
var backgroundCounter= 15;

var currentPlayer;
var otherPlayer;
var boardExists = false;



function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}


// places a character on a card at col row, updates the co-ordinates of character to reflect this

var placeOnCard = function(character, col, row){
//  var oldCard = document.querySelector("[data-row='" +(character.row).toString() + "'][data-col='" +(character.col).toString() + "']");
  var newCard = document.querySelector("[data-row='" +row.toString() + "'][data-col='" +col.toString() + "']");

  // if(oldCard){
  //   newImage = oldCard.children[0];
  //   newCard.appendChild(newImage);
  // }
  // else{
    var newImage = document.createElement('img');
    newImage.src = character.image;
    newCard.appendChild(newImage);
//  }
 //console.log(newCard);

  character.col = col;
  character.row = row;
}


// removes the character from the card that matches it's coordinates. It leaves the co-ordinate
// attributes of the character unchanged!!!!!!
var removeFromCard = function(character){
  var card = document.querySelector("[data-row='" +(character.row).toString() + "'][data-col='" +(character.col).toString() + "']");
  //card.innerHTML = "";
  card.children[0].remove();
}

// toggles the visibility of the image on the card at the given co-ordinates
// doesn't seem to need the character?!!!!!!
var switchVisibility = function(col, row){
  var card = document.querySelector("[data-row='" +row.toString() + "'][data-col='" +col.toString() + "']");

  if(card.children[0]){
    card.children[0].classList.toggle("hidden");
  }
}


// changes the visibility of the area defined by the input values, excluding
// the players

var switchVisibilityArea = function(minCol, maxCol, minRow, maxRow){
  for(var i=minCol; i<maxCol; i++){
    for(var j=minRow; j<maxRow; j++){
      if(!(i=== player1.col && j === player1.row)&&!(i=== player2.col && j === player2.row)){  //exclude the players from the visibility toggle
        switchVisibility(i, j);
        var card = document.querySelector("[data-row='" +j + "'][data-col='" +i + "']");
        card.classList.toggle("illuminated");
      }
    }
  }

}

//
var illuminate= function(character){
  var range = 2;
  var minCol;
  var maxCol;
  var minRow;
  var maxRow;

  if(character.col-range < 0){
    minCol= 0;
  }
  else{
    minCol = character.col-range;
  }

  if(character.col+range > boardCol){
    maxCol = boardCol;
  }
  else{
    maxCol = character.col+range;
  }

  if(character.row-range < 0){
    minRow= 0;
  }
  else{
    minRow = character.row-range;
  }

  if(character.row+range > boardRow){
    maxRow = boardRow;
  }
  else{
    maxRow = character.row+range;
  }

// illuminate the area, wait, then switch back to hidden
  switchVisibilityArea(minCol, maxCol, minRow, maxRow);
  setTimeout(function(){switchVisibilityArea(minCol, maxCol, minRow, maxRow);}, 1000);


}


var displayWinner = function(character){
  document.querySelector(".winner").childNodes[1].textContent = character.name + " wins!";
  document.querySelector(".winner").childNodes[2].src = character.image;
  document.querySelector(".winner").classList.toggle("collapse");
}

//dynamically creates the cards that make up the board, based on width and height input

var generateBoard = function(column, row){

  for(var j=0; j< row; j++){
    for(var i=0; i< column; i++){
      var newBoardSquare = document.createElement('div');
      newBoardSquare.className = "card";
      newBoardSquare.dataset.col = i.toString();
      newBoardSquare.dataset.row = j.toString();
      document.querySelector('.board').appendChild(newBoardSquare);
    }
  }
}

// populates the board with inert background characters
var populateBackground = function(counter){
  var i =0;
  while(i< counter){
    var randomCol = getRandomInt(0, boardCol-1);
    var randomRow = getRandomInt(0, boardRow-1);
    var randomChar = getRandomInt(0, backgroundChars.length -1);
    var card = document.querySelector("[data-row='" +randomRow.toString() + "'][data-col='" +randomCol.toString() + "']");
    if(!card.children[0]){
      placeOnCard(backgroundChars[randomChar], randomCol, randomRow);
      switchVisibility(randomCol, randomRow);
      i++;
    }
  }
}

// places target and enemies on the board, checking that they're not overwriting any already existing characters

var populateElements = function(){
  var i=0;
  while(i< elements.length){
    var randomCol = getRandomInt(0, boardCol-1);
    var randomRow = getRandomInt(0, boardRow-1);

    var card = document.querySelector("[data-row='" +randomRow.toString() + "'][data-col='" +randomCol.toString() + "']");
    if(!card.children[0]){
      placeOnCard(elements[i], randomCol, randomRow);
      switchVisibility(randomCol, randomRow);
      i++;
    }
  }
}



// initialise the game

    //document.querySelector('.start-game').addEventListener('click', function(event){
    //var input = event.which;

    document.body.addEventListener('keydown', function(event){
      var input = event.which;

      //on return
    if(input === 13){
    document.querySelector(".instructions").classList.toggle("collapse");

    generateBoard(boardCol, boardRow);

    placeOnCard(player1, 0, boardRow-1);
    placeOnCard(player2, boardCol-1, 0);

    //give the player images a unique class
    var card1 = document.querySelector("[data-row='" +(boardRow-1).toString() + "'][data-col='" +(0).toString() + "']");
    card1.children[0].className = "player";
    var card2 = document.querySelector("[data-row='" +(0).toString() + "'][data-col='" +(boardCol-1).toString() + "']");
    card2.children[0].className = "player";


    populateElements();
    populateBackground(backgroundCounter);

    //player1.image ='<img class="is-visible" src="img/fish3.jpg">';

    //illuminateBoard();

    // player1 starts
    currentPlayer = player1;
    otherPlayer = player2;
    //document.querySelector('.player1').classList.toggle("current", player1 === currentPlayer );
    boardExists = true;

  }
});


document.querySelector('.board').addEventListener('click', function(event){

//  if(boardExists){
    //
    //select the card that's being clicked, not the image on it
    var targetCard;
    if(event.target.nodeName == "IMG"){
      targetCard = event.target.parentNode;
    }
    else{
      targetCard =event.target;
    }

    var newCol = parseInt(targetCard.dataset.col);
    var newRow = parseInt(targetCard.dataset.row);


    // if clicks on self, illuminate surrounding area
    if(newCol === currentPlayer.col && newRow === currentPlayer.row){
      illuminate(currentPlayer);
    }
    //check for target
    else if(newCol === elements[0].col && newRow === elements[0].row){
      removeFromCard(currentPlayer);
      switchVisibility(newCol, newRow);
      displayWinner(currentPlayer);
    }
    //check for enemies
    else if((newCol === elements[1].col && newRow === elements[1].row)||(newCol === elements[2].col && newRow === elements[2].row)||(newCol === elements[3].col && newRow === elements[3].row)){
      removeFromCard(currentPlayer);
      switchVisibility(newCol, newRow);
      displayWinner(otherPlayer);
    }

    // write a function to check enemies, returns the index of the enemy in the array
    // else if(newCol === elements[i].col && newRow === elements[i].row){
    //   removeFromCard(currentPlayer);
    //   switchVisibility(elements[i].col, elements[i].row);
    //   displayWinner(otherPlayer);
    // }

    //check for background characters, if present remove them
    else if(targetCard.children[0]){
      targetCard.children[0].remove();
      removeFromCard(currentPlayer);
      placeOnCard(currentPlayer, newCol, newRow);
    }
    //move player
    else {
      removeFromCard(currentPlayer);
      placeOnCard(currentPlayer, newCol, newRow);
    }


    //toggle the Players
    if(currentPlayer === player1){
      currentPlayer = player2;
      otherPlayer = player1;
    }
    else{
      currentPlayer =player1;
      otherPlayer = player2;
    }

    //highlight current player

    // border around player
    // var newCol = currentPlayer.col;
    // var newRow = currentPlayer.row;
    // var card = document.querySelector("[data-row='" + newRow + "'][data-col='" + newCol + "']");
    // card.classList.toggle("current-player");

    // highlight side box
    //document.querySelector('.player1').classList.toggle("current", player1 === currentPlayer );
    //document.querySelector('.player2').classList.toggle("current", player2 === currentPlayer );
//  }
});
