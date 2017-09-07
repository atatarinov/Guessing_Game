// To test if JS and jQuery are connected.
// if(jQuery) {
//   alert('jQuery!!');
// } else {
//   alert('NO JQuery!! :(')
// }

function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1;
} 

function shuffle(array) {
  var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}

function Game() {
  this.playersGuess = null;;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(num) {
  if(num < 1 || num > 100 || isNaN(num)) {
    $('#subtitle').text('Grr...That is an invalid guess!!');
    throw 'That is an invalid guess.';
  } else {
    this.playersGuess = num;
    return this.checkGuess();
  }
}

Game.prototype.checkGuess = function() {
  
  if(this.playersGuess === this.winningNumber) {
    $('#hint, #submit').prop("disabled",true);
    $('#subtitle').text("You win!!! Press the Reset button to play again!").css('color', '#35a2b9');
    return 'You Win!';
  }
  
  if(this.pastGuesses.includes(this.playersGuess)) {
    $('#subtitle').text("You have already guessed that number");
    return 'You have already guessed that number.';  
  } else {
    this.pastGuesses.push(this.playersGuess);
    console.log(this.pastGuesses)
    $('.guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
    //^
  }

  if(this.pastGuesses.length === 5) {
    $('#hint, #submit').prop("disabled",true);
    $('#subtitle').text("You Lose!! Press the Reset button to play again!").css('color', 'red');
    return 'You Lose.';
  }

  // if(!this.pastGuesses.includes(this.playersGuess)) {
  //   this.pastGuesses.push(this.playersGuess);
  //   $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
  // }
  
  let diff = this.difference();
  if(this.isLower()) {
      $('#subtitle').text("Too Low, Guess Higher!")
  } else {
      $('#subtitle').text("Too High, Guess Lower!")
  }

  if(Math.abs(this.playersGuess - this.winningNumber) < 10) {
    
    return "You\'re burning up!";
  }
  if(Math.abs(this.playersGuess - this.winningNumber) < 25) {
    
    return "You\'re lukewarm.";
  }
  if(Math.abs(this.playersGuess - this.winningNumber) < 50) {
    
    return "You\'re a bit chilly.";
  }
  if(Math.abs(this.playersGuess - this.winningNumber) < 100) {
    
    return "You're ice cold!";
  }
}  

Game.prototype.provideHint = function() {
  let hintArr = [];
  hintArr.push(generateWinningNumber());
  hintArr.push(this.winningNumber);
  hintArr.push(generateWinningNumber());
  shuffle(hintArr); 
  return hintArr;
}

function newGame() {
  return new Game();
}

function makeAGuess(game) {
  var guess = $('#input').val();
  
  $('#input').val("");
  var output = game.playersGuessSubmission(parseInt(guess,10));
  
}

$(document).ready(function() {
  let game = newGame();
  console.log(game);
  
  $('#submit').click(function(e) {
    makeAGuess(game);
  })

  $('#input').keypress(function(event) {
    if(event.which == 13) {
      makeAGuess(game);
    }
  })
  // function makeAGuess(game) {
  //   var guess = $('#input').val();
  //   $('#input').val("");
  //   var output = game.playersGuessSubmission(parseInt(guess,10));
  //   $('#title').text(output);
  // }
  $('#hint').click(function() {
    let hints = game.provideHint();
    $('#subtitle').text('The winning number is... '+hints[0]+', '+hints[1]+', or '+hints[2]).css('color', 'aqua');
  });
  
  $('#reset').click(function() {
    game = newGame();
    $('#title').text('Play Again!');
    $('#subtitle').text('Guess a number between 1-100!').css('color', 'white');
    $('.guess').text('');
    $('#hint, #submit').prop("disabled",false);
  })


});

