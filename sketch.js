//VARIABLES
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudimage;
var ob1,ob2,ob3,ob4,ob5,ob5;
var cloudGroup,cactusGroup
var gameOver,gameStart,gameOverImage,gameStartImage;


var score=0;
var PLAY=1;
var END=0
var gameState=PLAY

//PRELOAD
function preload(){

  
  //TREX ANIMATION
  trex_running= loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  trex_collided = loadImage("trex_collided.png");
  
  //IMAGES
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  gameOverImage=loadImage("gameOvernew.png");
  gameStartImage=loadImage("restart.png");
}
function setup() {
  
  createCanvas(600,200)
  
  //create a trex sprite 
  trex = createSprite(50,150,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("COLLIDED", trex_collided);
  trex.scale = 0.1;
  trex.debug=false;
  trex.setCollider("circle",0,0,40)
  
  ///GAMEOVER SPRITE
  gameOver = createSprite(300,100,20,20);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.scale=0.5
  
  ///GAMESTART SPRITE
  gameStart = createSprite(300,150,20,20);
  gameStart.addImage("gameOver", gameStartImage);
  gameStart.scale=0.5
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //GROUPS
  cloudGroup=new Group();
  cactusGroup=new Group();
}

  function draw() {
  //set background color
  background(180);
  
  if (gameState===PLAY){
  
  //MAKING GAMEOVER AND GAMESTART U=INVISIBLE DURING PLAY STATE
  gameOver.visible= false 
  gameStart.visible= false
    
  // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }
 
  //ADDING GRAVITY  
  trex.velocityY = trex.velocityY + 0.8;
    
  //ADDING Score
    
  score= score + Math.round(frameCount/60);
    
  text("score: "+ score,100,100) ;
  
  
    //RESETTING THE GROUND TO MAKE IT INFINITE
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  //Spawn Clouds
  spawnClouds()
  
  //Spawn Cactus
  spawnCactus()

 
  if(trex.isTouching(cactusGroup)){
  gameState=END;
  }
  
}
else if(gameState===END){  
  
  ground.velocityX=0;
  
  cloudGroup.setVelocityXEach(0)        
  cactusGroup.setVelocityXEach(0)
  cloudGroup.setLifetimeEach(-1)        
  cactusGroup.setLifetimeEach(-1)
  
  trex.changeAnimation("COLLIDED", trex_collided)
  
  //MAKING GAMEOVER AND STRAT SPRITES VISIBLE
  gameOver.visible= true 
  gameStart.visible= true

}  

  //stop trex from falling down
  trex.collide(invisibleGround);
//reseting the game
 if(mousePressedOver(gameStart)){
  reset();
 }  
  drawSprites();


}

function spawnClouds(){
  //framecount gives the the count fo every frame
  //% is called as mode opperator and gives the reminder of the division
  //the if condection tells the computer to display the cloud afterevery 100 frame
     
 if(frameCount%100===0){ 
  // write your code here 
 var cloud = createSprite(550,20,50,20);
 cloud.addImage("cloud",cloudImage);
 cloud.velocityX = -10;
 
   //the yposition of cloud is changed using random number  
 cloud.y=Math.round(random(10,150));
 
   //making trex come infront of the cloud  
 cloud.depth=trex.depth;
 trex.depth=trex.depth+1;
  cloud.lifetime=60
   cloudGroup.add(cloud);
  } 
}
function spawnCactus(){
if(frameCount%60===0){
  
  //creating cactus sprite
var cactus = createSprite(600,160,50,20);
cactus.velocityX=-10
var rand=Math.round(random(1,6));  
switch(rand){
  case 1:cactus.addImage("image1",ob1);break;
  case 2:cactus.addImage("image2",ob2);break;
  case 3:cactus.addImage("image3",ob3);break;
  case 4:cactus.addImage("image4",ob4);break;
  case 5:cactus.addImage("image5",ob5);break;
  case 6:cactus.addImage("image6",ob6);break;
  default:break;
}
  cactus.scale=0.6;
  cactus.lifetime=60
  cactusGroup.add(cactus)
}  
  
}
function reset (){
gameState=PLAY
cactusGroup.destroyEach();
cloudGroup.destroyEach();
 trex.changeAnimation("running", trex_running)
score=0

}

