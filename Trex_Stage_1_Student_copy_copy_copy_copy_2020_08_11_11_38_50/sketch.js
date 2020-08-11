var trex, treximg, treximg2, ground, groundimg, ground2, cloudgroup, cloudimg, cactusgroup, aimg1, aimg2, aimg3, aimg4, aimg5, aimg6, gameover, restart, gani, rimg, dino, dimg, dinogroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;    

function preload(){

treximg = loadAnimation("trex1.png","trex3.png","trex4.png");

treximg2 = loadAnimation("trex_collided.png");
  
dimg = loadImage("bird.png");  
  
dino = loadAnimation("Dino.png");  
 
gani = loadImage("gameOver.png");
  
rimg = loadImage("restart.png");  
  
groundimg = loadImage("ground2.png");

cloudimg = loadImage("cloud.png");
  
aimg1 = loadImage("obstacle1.png") ;
  
aimg2 = loadImage("obstacle2.png");
  
aimg3 = loadImage("obstacle3.png");  

aimg4 = loadImage("obstacle4.png") ;

aimg5 = loadImage("obstacle5.png");
  
aimg6 = loadImage("obstacle6.png");}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 100, 10, 10);
  trex.addAnimation("trexr", treximg);
  trex.addAnimation("dino", dino);
  trex.addAnimation("trex", treximg2);
  trex.scale = 0.5;

  ground = createSprite(300, 150, 600, 10);
  ground.addImage("groundi", groundimg)
  
  ground2 = createSprite(300, 155, 600, 10)
  ground2.visible = false;
  
  gameover = createSprite(290, 60, 10, 10);
  gameover.addImage("gameover", gani);
  gameover.visible = false;
  gameover.scale = 0.5;
  
  restart = createSprite(290, 90, 10, 10);
  restart.addImage("restart", rimg);
  restart.visible = false;
  restart.scale = 0.5;
  
  cloudgroup = new Group();
  
  catcusgroup = new Group();
  
  dinogroup = new Group();
}

function draw() {
  background("black");
  text(mouseX +","+ mouseY, mouseX, mouseY)
  drawSprites();
  
  
if(gameState === PLAY){
      if (keyDown("space") && trex.y >= 126){
     trex.velocityY = -10;
      }
  
trex.velocityY = trex.velocityY + 0.8;
ground.velocityX = -3; 

if(ground.x < 0){
  ground.x = ground.width/2;  
}  
createclouds();  
  
obstacles();

dinos();
  
if (keyDown(DOWN_ARROW)){
    
  trex.changeAnimation("dino", dino);
  trex.scale = 0.15;  
    
    }
  if (keyWentUp(DOWN_ARROW)){
  
  trex.changeAnimation("trexr", treximg);
  trex.scale = 0.5;
    
  }
  
  
  score = score + Math.round(getFrameRate()/60)
  
if(trex.isTouching(catcusgroup ) || trex.isTouching(dinogroup) ){
   gameState = END;
  
   }  
  
} else if(gameState === END){
    ground.velocityX = 0;
    catcusgroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);          
    catcusgroup.setLifetimeEach(-5);
    cloudgroup.setLifetimeEach(-5);                            
  
   trex.changeAnimation("trex", treximg2);
  
   trex.velocityY = 0;
  
  restart.visible = true;
  gameover.visible = true;
  
  if (mousePressedOver(restart)){
     reset();
     
     
     }
  
  
  
}
  
  
  text("score:"+score, 540, 30);
  trex.collide(ground2);
  
    
  

}

function createclouds(){

if(frameCount % 60 === 0 ){
var cloud = createSprite(600, 20, 10, 10)
cloud.y = random(20, 100)
cloud.addImage( "cloud", cloudimg)
cloud.scale = 0.5;  
cloud.velocityX = -3;
cloud.lifetime = 200;
cloud.depth = trex.depth;
trex.depth = trex.depth + 1;
cloudgroup.add (cloud); 
}

}

function obstacles(){

if(frameCount % 100 === 0){
  var catcus = createSprite(600, 130, 10, 10) 
  catcus.velocityX = -3;
  catcus.lifetime = 200; 
  var rand = Math.round(random(1, 6)) 
  
  switch(rand){
    case 1: catcus.addImage("anicatcus1", aimg1);
    break;
    case 2 : catcus.addImage("anic", aimg2);
    break;
    case 3: catcus.addImage("ac", aimg3);
    break;
    case 4: catcus.addImage("an", aimg4);
    break;
    case 5 : catcus.addImage("a", aimg5);
    break;
    case 6: catcus.addImage("ac3", aimg6);
    break;
    default:break;
  }
  catcus.scale = 0.5;
  catcusgroup.add(catcus);
  }



}

function reset(){

cloudgroup.destroyEach();
catcusgroup.destroyEach();
score = 0;
restart.visible = false;
gameover.visible = false;  
trex.changeAnimation("trexr", treximg);  
gameState = PLAY;



}

function dinos(){

if(frameCount % 300 === 0 && score > 500){
    var dino = createSprite(600, random(50, 150), 10, 10);
    dino.addImage("dino", dimg)
    dino.velocityX = -10;  
    dino.lifetime = 60;
  
    dinogroup.add(dino);  
   
   }





}




