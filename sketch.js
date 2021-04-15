var balloon,backGround,balloonAnimation,database,position;

function preload(){
backGround=loadImage("images/Hot Air Ballon-01.png");
balloonAnimation=loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  balloon=createSprite(250, 260, 50, 50);
  balloon.scale=0.5
  balloon.addAnimation("ani",balloonAnimation);

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readHeight,showError);
}

function draw() {
  background(backGround);  
  textSize(15);
  fill(0);
  text("Use arrow keys to move!",30,20);

  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10;
  }

  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10;
  }

  else if(keyDown(UP_ARROW)){
    balloon.y=balloon.y-10;
    balloon.scale=balloon.scale+0.01;
  }

  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+10;
    balloon.scale=balloon.scale-0.01;
  }
  
  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x':height.x+x,
    'y':height.y+y
  })
}

function  readHeight(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}

function showError(){
  console.log("Error in the writing to the database");
}