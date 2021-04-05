var PLAY= 1;
var END= 0;
var gameState=PLAY;
var score;


var flyer,flyerimg;
var shot, shotimg;
var evil, evilimg, evilgroup;
var bg, bgimg;
var gameover, gameoverimg;
var restart, restartimg;

function preload(){
    
    flyerimg=loadImage("rocket.png");
    evilimg = loadImage("evil.png");
    shotimg = loadImage("shooter.png")
    bgimg = loadImage("backbone.png");
    gameoverimg = loadImage("goimg.png");
    restartimg = loadImage("reimg.png")
}

function setup(){
    var canvas = createCanvas(1600,800);

    //to create the ground
    bg = createSprite(800,10,200,200);
    bg.addImage("behind",bgimg);
    bg.scale = 8.0;
    bg.x = bg.width/2;
    bg.velocityX = -2;

    //creation of the rocket
    flyer = createSprite(80,400,20,60);
    flyer.addImage("plane",flyerimg);

    //to initiate the score
    score = 0;

    //initializing the group 
    evilgroup = new Group();

    //gameover sprite to be created
    gameover = createSprite(800,200,10,10);
    gameover.addImage("finished",gameoverimg);
    gameover.visible = false;
    gameover.scale = 0.5;

    //the restart sprite to be created
    restart = createSprite(800,400,10,10);
    restart.addImage("try",restartimg);
    restart.visible = false;
    restart.scale = 0.5;
}

function draw(){
    background("brown");

    
    if (gameState===PLAY){
        
        //to make the ground move
        //bg.velocityX = -2;
        if(bg.x < 0){
            bg.x = bg.width/2;
        }

        //to make the flyer move up and down with the help of the aroow keys
        if(keyDown(UP_ARROW)){
            flyer.y = flyer.y - 5;
        }

        if(keyDown(DOWN_ARROW)){
            flyer.y = flyer.y + 5;
        }

        //to amke the shooter appear when the right arrow key is being pressed
        if(keyWentDown(RIGHT_ARROW)){
            var shot = createSprite(0, 400, 5, 10);
            shot.velocityX = 6;
            shot.y = flyer.y;
            shot.scale = 0.5;
            shot.addImage("bomb",shotimg);
        }  

        //to make the evilships appear on the screen
        evilship();

        if(evilgroup.isTouching(flyer)){
            gameState = END;
        }

        if(evilgroup.isTouching(shot)){
            evilgroup.destroy();
            score = score + 10;
        }

    }    

    if (gameState === END) {
        
        //to stop when the game comes to the end
        bg.x = 0;

        // make the gameover and the restart to be visible once the game is done
        gameover.visible = true;
        restart.visible = true;
    
        //to turn off the other evilships coming near
        evilgroup.setVelocityXEach(0);
        
        //set lifetime of the game objects so that they are never destroyed
        evilgroup.setLifetimeEach(-1);
        
        if(mousePressedOver(restart)) {
            reset();
        }

    }
    drawSprites();

    
    textSize(20);
    fill("black");
    text("Score: "+ score, 1300,50);
}

//to restart the game
function reset(){
    gameState = PLAY;
    gameover.visible = false;6
    restart.visible = false;
    
    evilgroup.destroyEach();
    score = 0;
}

//creation of the shooter
//function pushshot(){
    
    //return shot;
//}

//creation of the evil space crafts
function evilship(){
    if(frameCount % 150 === 0 ){
        
        //to create the evil ship sprite
        evil = createSprite(1600,400,10,10);
        evil.addImage("devil",evilimg);

        //to set the velocity for the evil ship
        evil.velocityX = -2;
        evil.lifetime = 800;

        //to give the evil ship a random position
        evil.y = Math.round(random(50,750));

        //to add the evil ships in a group
        evilgroup.add(evil);
    }
    
}


