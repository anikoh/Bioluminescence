//visibility
//     document.querySelector("[data-row='0'][data-col='10']").style.visiblity = "visible"
//     document.querySelector("[data-row='0'][data-col='10']").innerHTML = '<img class="is-visible" src="img/jellyfish.jpg">'




// Global variables for game elements. Players, target, enemies, background characters

  var player1 = {
    col: 0,
    row: 0,
    lights: 5,
    image: '<img src="img/fish3.jpg">'
  }

  var player2 = {
    col: 0,
    row: 0,
    lights: 5,
    image: '<img src="img/fish1red.jpg">'
  }

var elements =[

  target1 = {
    col: 0,
    row: 0,
    image: '<img src="img/fish2.jpg">'
  },

  enemy1 = {
    col: 0,
    row: 0,
    image: '<img src="img/octopus.jpg">'
  },

  enemy2 = {
    col: 0,
    row: 0,
    image: '<img src="img/squid.jpg">'
  },

  enemy3 = {
    col: 0,
    row: 0,
    image: '<img src="img/squid2.jpg">'
  },
]



backgroundChars = [
  plant1 = {
    col: 0,
    row: 0,
    image: '<img src="img/plant.jpg">'
  },

  plant2 = {
    col: 0,
    row: 0,
    image: '<img src="img/jellyfish.jpg">'
  },

  plant3 = {
    col: 0,
    row: 0,
    image: '<img src="img/jellyfish2.jpg">'
  }
];

var boardCol=12;
var boardRow=9;
var backgroundCounter= 15;

var currentPlayer;



function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}


// places a character on a card at col row, updates the co-ordinates of character to reflect this

var placeOnCard = function(character, col, row){

  var card = document.querySelector("[data-row='" +row.toString() + "'][data-col='" +col.toString() + "']");

  card.innerHTML = character.image;

  character.col = col;
  character.row = row;
}


// removes the character from the card that matches it's coordinates. It leaves the co-ordinate
// attributes of the character unchanged!!!!!!
var removeFromCard = function(character){

  var card = document.querySelector("[data-row='" +(character.row).toString() + "'][data-col='" +(character.col).toString() + "']");
  card.innerHTML = "";
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
  for (var i=0; i< counter; i++){
    var randomCol = getRandomInt(0, boardCol-1);
    var randomRow = getRandomInt(0, boardRow-1);
    var randomChar = getRandomInt(0, backgroundChars.length -1);
    placeOnCard(backgroundChars[randomChar], randomCol, randomRow);
  }
}

// places target and enemies on the board, checking that they're not overwriting an already existing character
// later make sure none of the elements are overwritten!!!

var populateElements = function(){
  for(var i=0; i< elements.length; i++){
  var randomCol = getRandomInt(0, boardCol-1);
  var randomRow = getRandomInt(0, boardRow-1);

  placeOnCard(elements[i], randomCol, randomRow);
  }
}

var illuminateBoard = function(){

}


// initialise the game

document.body.addEventListener('keydown', function(event){
  var input = event.which;

  //on return
  if(input === 13){
    generateBoard(boardCol, boardRow);
    populateBackground(backgroundCounter);
    populateElements();

    placeOnCard(player1, 0, boardRow-1);
    placeOnCard(player2, boardCol-1, 0);

    player1.image ='<img class="is-visible" src="img/fish3.jpg">';

    illuminateBoard();

    // player1 starts
    currentPlayer = player1;
    document.querySelector('.player1').classList.toggle("current", player1 === currentPlayer );


  }
});


// the keyboard input version
// each turn of the game
//document.body.addEventListener('keydown', function(event){
//
//   var input = event.which;
//
//   if(input === 32 || (input === 37 && currentPlayer.col > 0) || (input === 38 && currentPlayer.row > 0) || (input === 39 && currentPlayer.col+1 < boardCol)|| (input === 40 && currentPlayer.row+1 < boardRow)){
//
//     // space bar 32
//     // left arrow	37 col-1
//     // up arrow	38 row-1
//     // right arrow	39 col+1
//     // down arrow	40 row+1
//     var newRow = currentPlayer.row;
//     var newCol = currentPlayer.col;
//
//
//     if(input === 32){
//       illuminate(currentPlayer);
//     }
//     else if(input === 37){
//       newCol--;
//     }
//     else if(input === 38){
//       newRow--;
//     }
//     else if(input === 39){
//       newCol++;
//     }
//     else if(input === 40){
//       newRow++;
//     }
//
//


document.querySelector('.board').addEventListener('click', function(event){

  if(event.target.className === "card"){

      //check for win and lose conditions
    // win
    // if(newCol === target1.col && newRow === target1.row){
    //  console.log(currentPlayer + "wins!");
    // }
    // else if(newCol === enemy1.col && newRow === enemy1.row){
    //   console.log(currentPlayer + "loses!");
    //
    // }
    if(event.target.dataset.col === currentPlayer.col && event.target.dataset.row === currentPlayer.row){
      illuminate(currentPlayer);
    }
    else {
      removeFromCard(currentPlayer);
      placeOnCard(currentPlayer, event.target.dataset.col, event.target.dataset.row);
    }


    //toggle the Players
    if(currentPlayer === player1){
      currentPlayer = player2;
    }
    else{
      currentPlayer =player1;
    }

    //highlight current player
    document.querySelector('.player1').classList.toggle("current", player1 === currentPlayer );
    document.querySelector('.player2').classList.toggle("current", player2 === currentPlayer );
  }
});





var insertCharacter = function(column, row){
  var randomCol = getRandomInt(0, column-1);
  var randomRow = getRandomInt(0, row-1);

  enemy1.col = randomCol;
  enemy1.row = randomRow;

//test =document.querySelector("[data-row='3'][data-col='1']")

  var enemySquare= document.querySelector("[data-row='" +randomRow.toString() + "'][data-col='" +randomCol.toString() + "']");

  enemySquare.innerHTML = enemy1.image;

}



// creates num x enemy objects, returns them as a string
var createEnemies = function(num){

}
