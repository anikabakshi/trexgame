var trex, trex_running, trex_collided;

var highscore=0,x=0

var ground, invisibleGround, groundImage;

//sets the score at the begining of the game
  var score = 0;

var cloud,cloudimage,cloudgroup

var obstacle,cactus1,cactus2,cactus3,cactus4,cactus5,cactus6,obstaclesgroup

var playagain,resetImage,playagainImage,reset

 //sets the game state
  var PLAY = 1;
  var END = 0;
  var gamestate = PLAY;



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimage=loadImage("cloud.png")
  groundImage = loadImage("ground2.png")
  cactus1=loadImage("obstacle1.png")
  cactus2=loadImage("obstacle2.png")
  cactus3=loadImage("obstacle3.png")
  cactus4=loadImage("obstacle4.png")
  cactus5=loadImage("obstacle5.png")
  cactus6=loadImage("obstacle6.png")
  
  resetImage=loadImage("restart.png")
  playagainImage=loadImage("gameOver.png")
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
   trex.setCollider("circle", 0, 0, 50);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudgroup=new Group();
  obstaclesgroup=new Group();
  
  playagain=createSprite(300,100,10,10);
  playagain.addImage(playagainImage);
  playagain.scale=0.5; 
  
  reset=createSprite(300,150,10,10);
  reset.addImage(resetImage);
  reset.scale=0.5;
 
  
}

function draw() {
  
   if (mousePressedOver(reset)) {
     
       trex.changeAnimation("running", trex_running);
        
        if (score>highscore) {
          highscore = score;
        }
          
        //solves the problem of the added clouds and cactuses
        cloudgroup.destroyEach();
        obstaclesgroup.destroyEach();
        
        score = 0;
        
        //keeps the gamestate at play after pressing the reset or the space bar
        gamestate = PLAY;
     
      }
  
  background("white");
  
  if(gamestate==PLAY){
    
    reset.visible=false;
      playagain.visible=false;
  
    if (trex.isTouching(obstaclesgroup)) {
        gamestate = END;
      }
  
  //sets the score
      if (World.frameCount%10 == 0) {
        score = score+1;
      }
     
  
  if(keyDown("space")&&trex.y>140) {
    trex.velocityY = -10;
    
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnClouds();
  spawnobstacles();
  }
  
  if (gamestate==END) {
    
    trex.changeAnimation("collided",trex_collided)
    
  playagain.visible = true;
    reset.visible=true;
    
    //sets the ground velocity to 0 because the game is over
      ground.velocityX = 0;
      
      //sets the velocity of both the groups as0 so that they do not move in endstate
      cloudgroup.setVelocityXEach(0);
      obstaclesgroup.setVelocityXEach(0);
      
      //sets the lifetime so that they don't disappere at end state
      cloudgroup.setLifetimeEach(-1);
      obstaclesgroup.setLifetimeEach(-1);
  
      }
      
  text("highscore:"+highscore, 0, 30);
  //tells the score
  fill("black");
  textSize(15);
  text("score:"+score, 0, 15);
  
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
    //write code here to spawn the clouds
    if (World.frameCount % 60 === 0) {
      
      //createsthe cloud sprite
      var cloud = createSprite(600,120,40,10);
      
      //makes the group into a sprite
      cloudgroup.add(cloud);
      
      //sets the the y position as random
      cloud.y =Math.round(random(80,120));
      
      cloud.addImage("cloud",cloudimage)
      cloud.scale=0.8
      
      //sets the velocity
      cloud.velocityX = -3;
      
       //assign lifetime to the variable
      cloud.lifetime = 200;
      
      //adjust the depth
      cloud.depth = trex.depth;
      trex.depth = trex.depth + 1;
      
    }
  
}

function spawnobstacles() {
  if (World.frameCount%70 == 0) {
    
    //creates the obstacle(cactus)
    var obstacle = createSprite(600, 160, 10, 10);
    
    //makes the "obstacle" group
    obstaclesgroup.add(obstacle);
    
    //makes adding the obstacles easier
    var rand2 =Math.round(random(1, 6));
    
    switch(rand2){
        
      case 1:obstacle.addImage(cactus1);
        break;
       case 2:obstacle.addImage(cactus2);
        break; 
        case 3:obstacle.addImage(cactus3);
        break;
        case 4:obstacle.addImage(cactus4);
        break;
        case 5:obstacle.addImage(cactus5);
        break;
        case 6:obstacle.addImage(cactus6);
        break;
        
    }
    
    obstacle.velocityX = -10;
    
    obstacle.scale = 0.5;
  
    //shows after how many frames the cactuses get created
    obstacle.lifetime = 95;
    obstacle.setCollider("rectangle", 0, 0, 40, 40);

    
}
}