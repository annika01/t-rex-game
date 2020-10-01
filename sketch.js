//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, restart, restart_image, gameover_image
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle, cloud, o1, o2, o3, o4, o5, o6, cloudimage
var cloudgroup, obstaclegroup
var count;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  restart_image= loadImage ("restart.png");
  gameover_image= loadImage ("gameOver.png");
  o1= loadImage("obstacle1.png")
  o2= loadImage("obstacle2.png")
  o3= loadImage("obstacle3.png")
  o4= loadImage("obstacle4.png")
  o5= loadImage("obstacle5.png")
  o6= loadImage("obstacle6.png")
  cloudimage= loadImage ("cloud.png")
  
  groundImage = loadImage("ground2.png")
  
  jump=loadSound("jump.mp3")
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  trex.setCollider("circle",0,0,30);
  
  count=0
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudgroup= new Group()
  obstaclegroup= new Group()
  
  //place gameOver and restart icon on the screen
 gameOver = createSprite(300,100);
 restart = createSprite(300,140);
gameOver.addImage("gameOver", gameover_image);
gameOver.scale = 0.5;
restart.addImage("restart", restart_image);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background(180);
text("Score: "+ count, 450, 10);
  
  
  if (gameState===PLAY){
  
     if(keyDown("space")&& trex.y>= 161.5) {
    trex.velocityY = -10;
       jump.play();
  }
      count = count + Math.round(getFrameRate()/60);
    
ground.velocityX = -(6 + 3*count/100);
    
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
   spawnObstacles();
    
    if(obstaclegroup.isTouching(trex)){
      
      gameState = END;
     
    }
    
  }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
 
  trex.collide(invisibleGround);
  drawSprites();
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud", cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudgroup.add(cloud)
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = ground.velocityX;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch (rand){
      case 1: obstacle.addImage(o1)
    break;
    case 2: obstacle.addImage(o2)
    break;
    case 3: obstacle.addImage(o3)
    break;
    case 4: obstacle.addImage(o4)
    break;
    case 5: obstacle.addImage(o5)
    break;
    case 6: obstacle.addImage(o6)
    break;
    default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclegroup.add(obstacle) 
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  count = 0;
  
 if(localStorage["HighestScore"] <count){ localStorage["HighestScore"] = count; }

  

  
  
}
                       