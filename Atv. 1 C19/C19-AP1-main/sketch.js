var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = createGroup ()
  climbersGroup = createGroup ()
  invisibleBlockGroup = createGroup ()

  ghost = createSprite (300,300,20,20)
  ghost.addImage ("ghost-standing.png", ghostImg)
  ghost.scale = 0.4


}

function draw() {
  background(200);
  
  drawSprites ()

  if(tower.y > 400){
      tower.y = 300
    }

  if (gameState == "play"){

    obstacle  ()
    
    if (keyDown (RIGHT_ARROW)){
      ghost.x += 10
    }
    if (keyDown (LEFT_ARROW)){
      ghost.x += -10
    }
    if (keyDown ('space')){
      ghost.velocityY = -10
    }

    ghost.velocityY += 0.8

    if (ghost.isTouching (climbersGroup)){
       ghost.velocityY = 0
    }

    if (ghost.isTouching (invisibleBlockGroup) || ghost.y > 600){
      gameState = 'end'
    }
  }
   
  
  if (gameState == "end"){

  background ('black')
  textSize (40)
  fill ('yellow')
  stroke ('yellow')
  text ('Fim de jogo',200,300)

  }

}


function obstacle () {
  if (frameCount % 240 == 0 ){
      door = createSprite (Math.round (random(100,500)), -50)
      climber = createSprite (door.x, 10)
      invisibleBlock = createSprite (door.x, 15, 10, 2)
      door.addImage ("door.png", doorImg)
      climber.addImage ("climber.png", climberImg)
      invisibleBlock.width = climber.width
      door.velocityY = 1
      climber.velocityY = 1
      invisibleBlock.velocityY = 1
      door.lifetime = 700
      climber.lifetime = 700
      invisibleBlock.lifetime = 700
      doorsGroup.add (door)
      climbersGroup.add (climber)
      invisibleBlockGroup.add (invisibleBlock)
      invisibleBlock.debug = true
  }
   
}
