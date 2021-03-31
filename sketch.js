var background, backgroundImage;

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  backgroundImage=loadImage("background.png");
  marioImage=loadImage("Mario.png");
  starsImg=loadImage("Stars.png");
  obstaclesImg=loadImage("obstacle.png")

}

function setup(){
  var canvas=createCanvas(800,800);

  background=createSprite(0,0,800,800);
  background.addImage(backgroundImage);
  background.x=background.width/2;

  mario=createSprite(30,110,10,10);
  mario.addImage(marioImage);
  mario.scale=0.05;

  invisibleGround=createSprite(200,140,400,10);
  invisibleGround.visible=false;

  starsGroup = new Group ();
  obstaclesGroup= new Group();
 

}

function draw(){
  if(gameState===PLAY){
  background.velocityX=-2;
  if(background.x<0){
    background.x=background.width/2;
  }
  if(keyDown("space")&& mario.y>=100){
    mario.velocityY=-12;
  }

  mario.velocityY=mario.velocityY+0.8;

  mario.collide(invisibleGround);

  stars();
  obstacles();

  if(mario.isTouching(obstaclesGroup)){
    gameState=END;
  }
}
else if(gameState===END){
  mario.velocityY=0;
  background.velocityX=0;
  obstaclesGroup.setVelocityXEach(0);
  starsGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  starsGroup.setLifetimeEach(-1);


}
  drawSprites();
}

function stars(){
  if(frameCount%100===0){
      var stars = createSprite(600,120,10,10);
      stars.y = Math.round(random(20,100));
      stars.addImage(starsImg);
      stars.scale=0.1;
      stars.velocityX = -3;
      stars.lifetime = 300;
      stars.depth=mario.depth;
      mario.depth=mario.depth+1;
      starsGroup.add(stars);
  }
}

function obstacles(){
  if(frameCount%120===0){
   var obstacles=createSprite(600,115,10,10)
   obstacles.addImage(obstaclesImg);
   obstacles.scale=0.3;
   obstacles.velocityX=-3;
   obstacles.lifetime=300;
   obstaclesGroup.add(obstacles);
  }
}

