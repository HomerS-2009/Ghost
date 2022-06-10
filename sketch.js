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

  //spookySound.loop()

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite ( 200,200,50,50)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.3
  
  invisibleBlockGroup = new Group()
  doorsGroup = new Group()
  climbersGroup = new Group()
}

function draw() {
  background(200);

  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space")){
      ghost.velocityY = -5
    }
    ghost.velocityY = ghost.velocityY + 0.5

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3
    }

    spawnObjects();

    if(ghost.isTouching(invisibleBlockGroup)||ghost.y > 600){
      ghost.destroy()
      gameState = "end"
    }

    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0
    }
    
    drawSprites()
  }
  else if(gameState === "end"){
    textSize(20)
    text("GAME OVER",220,300)
  }
  
  
}

function spawnObjects(){
  if(frameCount%240 === 0 ){
    var door = createSprite(200, -50, 50, 50)
    door.addImage(doorImg)
    door.velocityY = 1
    door.x = Math.round(random(120,400))
    door.lifetime = 800
    doorsGroup.add(door)

    var climber = createSprite(200, 10, 50, 50)
    climber.addImage(climberImg)
    climber.velocityY = 1
    climber.x = door.x
    climber.lifetime = 800
    climbersGroup.add(climber)

    var invisibleBlock = createSprite(200, 15, climber.width, 10)
    invisibleBlock.velocityY = 1
    invisibleBlock.x = door.x
    invisibleBlock.lifetime = 800
    invisibleBlockGroup.add(invisibleBlock)

    door.depth = ghost.depth 
    ghost.depth ++
  }
}