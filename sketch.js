var arrow;
var arrowImage;
var arrowGroup;

var bow;
var bowimg;

var ground;
var playgroundimg;

var background;

var score = 0;

var redB;

var redImg;

var PLAY = 1;

var END = 0;

var gameState = PLAY;

var missile, missileImg, missileB;

var bulletImg;

var gameOverS, gameOver, gameOverImg;

function preload() {
    bowimg = loadImage("images/rocket.png");
    redImg = loadImage("images/ufo.png");
    playgroundimg = loadImage("images/bg.jpg");
    missileImg = loadImage("images/missile.png");
    bulletImg = loadImage("images/bullet.png");
    gameOverImg = loadImage("images/gameOver.png");
    gameOverS = loadSound("gameOver.mp4");
  }
  
  function setup() {
    createCanvas(600, 600);
  
    bow = createSprite(70, mouseY, 10, 10);
    bow.addImage("bow", bowimg);
    bow.scale = 0.4;
  
    arrowGroup = createGroup();

    gameOver = createSprite(300,300);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.3;
  
    redB = createGroup();
    missileB = createGroup();
  }
  
  
  function draw() {
  
    background(playgroundimg);
  
    bow.y = mouseY;
  
    if(gameState === PLAY) {
      if (keyDown("space")) {
        createArrow();
      }

      gameOver.visible = false;

      bow.visible = true;
    
      if(arrowGroup.isTouching(redB)) {
          redB.destroyEach();
          arrowGroup.destroyEach();
          score +=1;
      }

      if(bow.isTouching(redB) || bow.isTouching(missileB)) {
        gameOverS.play();
        gameState = END;

        bow.visible = false;

        redB.destroyEach();
      }
      scores();
      redballoon();
      missiles();
    }

    if(gameState === END) {
      gameOver.visible = true;

        textSize(35);
        textFont("Ink Free");
        fill("white");
        text("Press 'R', to restart",150,500);

        if(keyCode === 114) {
          reset();
        }
    }
    
    drawSprites();
  }

  function redballoon() {
      if(frameCount%200 === 0) {
        var red = createSprite(600,Math.round(random(0, 600)), 10, 10);
        red.addImage(redImg);
        red.scale = 0.1;
        red.velocityX = -4;
        redB.add(red);
      }
  }

  function missiles() {
    if(frameCount%200 === 0) {
      var missile = createSprite(600,Math.round(random(0, 600)), 10, 10);
      missile.addImage(missileImg);
      missile.scale = 0.1;
      missile.velocityX = -4;
      missileB.add(missile);
    }
  }

  function createArrow() {
    if (keyDown("space")) {
      arrow = createSprite(70, bow.y, 10, 10);
      arrow.addImage(bulletImg);
      arrow.scale = 0.05;
      arrow.velocityX = 10;
    }
    arrow.lifetime = 550;
    arrowGroup.add(arrow);
  }
  
  function scores() {
    textSize(25);
    fill("white");
    text("Score: " + score, 20, 30);
  }
  
function reset() {
  gameState = PLAY;
  score = 0;
}