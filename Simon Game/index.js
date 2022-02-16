var randomColor = ["red", "green", "blue", "yellow"];
var randomPatern = []
var userInputPatern = []
var simonLevel = 1
var active = false;
var index = 0;
var gameOver = false;

start();
// start
function start(){
  $(document).on("keypress", function(e){
    if(e.key==="a"&&!active || gameOver){
      gameOver = false;
      active = true;
      nextSequence();
    }
  })
}


$(".btn").on("click", (e)=>{
  if(active){
    if(randomPatern[index] === e.target.id){
      index++;
      userInputPatern.push(e.target.id);
      console.log("userInput: "+userInputPatern);
      if(randomPatern.toString() === userInputPatern.toString()){
        index = 0;
        simonLevel++;
        userInputPatern = [];
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else{
      error();
    }
  }
})

function nextSequence(){
  $("#level-title").text("level " + simonLevel);
  var randomNumber = Math.floor(Math.random()*4);
  $("#"+randomColor[randomNumber]).addClass("pressed");
  var audio = new Audio('sounds/' + randomColor[randomNumber] + '.mp3');
  audio.play();
  randomPatern.push(randomColor[randomNumber]);
  console.log("randomInput: "+randomPatern);
  setTimeout(() => {
    $("#"+randomColor[randomNumber]).removeClass("pressed");
  }, 100);
}

$(".btn").on("click", function(e){
  var audio = new Audio('sounds/'+e.target.id+'.mp3');
  audio.play();
})

function error(){
  $("#level-title").text("Game over, Press any key toRestart");
  $("body").addClass("game-over");
  var audio = new Audio('sounds/wrong.mp3');
  audio.play();
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
  index = 0
  simonLevel=1;
  active = false;
  userInputPatern = []
  randomPatern = []
  gameOver = true;
}