var foodValue, food, foodSt, x, feed, addFood, lastFed, lastfed, button1, button2, y, x, currentTime, gameState,
hour;

function preload() {
  dog_img = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  milkBottle = loadImage("images/Milk.png");
  living = loadImage("images/Living Room.png");
  bed = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  Wash = loadImage("images/Wash Room.png");
  
}

function setup() {
  createCanvas(800, 800);
  database = firebase.database();
  dog = createSprite(630, 350, 10, 10);
  dog.addImage(dog_img);
  dog.scale = 0.3

  button1 = createButton('Feed Dog');
  button1.position(630, 500);

  button2 = createButton('Add stock');
  button2.position(760, 500);

  foodValue = database.ref('/');
  foodValue.on("value", readValue);

  lastFed = database.ref('/');
  lastFed.on("value", readTime);
  

  button1.mousePressed(writeStock);
  button2.mousePressed(addFood);

  gameState = "hungry"

  timing();

  
  
}


function readValue(data) {
  foodSt = data.val();
  food = foodSt.Food;
  //console.log(food);
}


function readTime(data) {
  timeS = data.val();
  lastfed = timeS.FeedTime;
  //console.log(lastfed);
}


function writeStock() {

  if (food <= 0) {
    food = 0
  }
  else {
    food= food - 1
  }

  database.ref('/').set({
    Food: food,
    FeedTime: hour,
  })


}

function addFood() {

  

  database.ref('/').set({
    Food:food+1,
    FeedTime: hour,
  })


}

async function timing() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  hour = datetime.slice(11, 13);
  currentTime = datetime.slice(11, 13);
  //console.log(hour)
  //console.log(currentTime);
  
  
}

function draw() {
  background(46,139,87);
  //hour = 28
  if(hour===(lastfed+1)){
      gameState = "playing"
    }
    else if(hour===(lastfed+2)){
      gameState = "sleeping"
    }
    else if(hour>(lastfed+2) && hour<=(lastfed+4)){
      gameState = "bathing"
    }
    else{
     gameState = "hungry"
  }

  console.log(lastfed);
  console.log(hour);
  console.log(gameState)


  if(gameState === "hungry"){


    push();
     fill("white");
     textSize(20);
     text("Food Remaining: " + food, 250, 150);
     text("Last Fed: " + lastfed, 250, 100);
     pop();
   
    
   
   
   drawSprites();
   
   
   
   var x=70,y=150; 
   if (food != 0){
     
     for(var i = 0; i < food; i++){
       if(i%10 === 0){
         x = 70
         y = y + 50
   
       }
       image(milkBottle, x, y, 50, 50);
       x = x + 30
   
   
   
     }
   }
  

  }
  
  if(gameState === "playing"){
    background(garden);
    }
  
   if(gameState === "sleeping"){
    background(bed);
    }
   if(gameState === "bathing"){
    background(Wash);
   }
 }




