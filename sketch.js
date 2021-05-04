//CREATING OBJECTS, LOADING IMAGES OBJECTS, GAME STATES, SCORE, INVISIBLE GROUND, GROUPS AS GLOBAL VARIABLES
   var PLAY = 1;
   var END = 0;
   var gameState = 1;

   var hunter, hunterR, hunterA;
   var jungle1, jungle;
   var dino, dinoR, dinoD;

   var INV;
   var score;

   var obstaclesGroup;
   var obs1, obs2, obs3, obs4, obs5;


 function preload() {
    
//PRELOADING THE IMAGES FOR:
//HUNTER RUNNING
     hunterR = loadAnimation("Run (1).png",
               "Run (2).png","Run (3).png",
               "Run (4).png","Run (5).png",
               "Run (6).png","Run (7).png",
               "Run (8).png","Run (9).png",
               "Run (10).png");

//HUNTER ATTACKING   
     hunterA = loadAnimation("Attack (1).png",
            "Attack (2).png","Attack (3).png",
            "Attack (4).png","Attack (5).png",
            "Attack (6).png","Attack (7).png",
            "Attack (8).png","Attack (9).png",
            "Attack (10).png");
   
//DINO RUNNING
     dinoR = loadAnimation("Run (1)-1.png",
           "Run (2)-1.png","Run (3)-1.png", 
           "Run (4)-1.png","Run (5)-1.png");
   
//DINO DEAD
     dinoD = loadAnimation("Dead (1).png",
            "Dead (2).png","Dead (3).png",
            "Dead (4).png","Dead (5).png",
            "Dead (6).png","Dead (7).png",
            "Dead (8).png");
   
//JUNGLE (BACKGROUND)
     jungle1 = loadImage("jungle1.png");
   
//OBSTACLES
     obs1 = loadImage("Prop_7.png");
     obs2 = loadImage("Prop_8.png");
     obs3 = loadImage("Pad_03_2.png");
     obs4 = loadImage("Pad_04_2.png");
     obs5 = loadImage("rocks1_5.png");            
}


 function setup() {
   
//CREATING CANVAS
     createCanvas(displayWidth, 650);
   
//CREATING SPRITES FOR:

//JUNGLE (BACKGROUND)
     jungle = createSprite(displayWidth/2, 300, displayWidth, 650);
     jungle.addImage("ground", jungle1);
     jungle.scale = 6;
    
//HUNTER    
     hunter = createSprite(50, 540, 20, 20);
     hunter.addAnimation("running", hunterR);
     hunter.addAnimation("attacking", hunterA);
     hunter.scale = 0.25;
   
//BABY DINO 
     dino = createSprite(200, 550, 20, 20);
     dino.addAnimation("saving", dinoR);
     dino.addAnimation("dead", dinoD);
     dino.scale = 0.25;
     
//INVISIBLE GROUND
     INV = createSprite(10, 590, 500, 10);
     INV.visible = false;
     
//SETTING THE COLLIDER FOR THE DINO
     dino.setCollider("rectangle", 0, 0, 200, 405);
   
//CREATING GROUPS FOR OBSTACLES  
     obstaclesGroup = new Group();
   
//CREATING SCORE
     score = 0;
}


 function draw() {
     background("lightgreen");
//FOLLOWING INSTRUCTIONS FOR THE COMPUTER IN THE GAME STATE PLAY
  if(gameState === PLAY){
     
//MOVING THE JUNGLE IMAGE 
     jungle.velocityX = -(4 + 3* score/500);
   
//REPEATING THE JUNGLE IMAGE TO SHOW THAT THE GROUND IS MOVING
  if(jungle.x < 200){
     jungle.x = jungle.width/0.9; 
}
   
//MAKING THE SCORE INCREASE AUTOMATICALLY
     score = score + Math.round(getFrameRate()/60);

     camera.position.x = displayWidth/2;
     camera.position.y = dino.y;
  
//MAKING THE DINO AND THE HUNTER JUMP USING SPACE KEY
  if(keyDown("space")){
     dino.velocityY = -8;
} 
    
     hunter.y = dino.y;
    
//GIVING GRAVITY TO THE HUNTER, DINO
     dino.velocityY = dino.velocityY + 0.8;
   
//COLLIDING THE HUNTER AND THE DINO ON THE INVISIBLE GROUND
     hunter.collide(INV);
     dino.collide(INV);
    
//CALLING THE FUNCTION
     spawnObstacles();
    
//COMMAND FOR THE GAME STATE TO END WHEN THE DINO TOUCHES THE OBSTACLES
  if(dino.isTouching(obstaclesGroup)){

     gameState = END;
     
     
}
} //GAME STATE CHANGED
  else if(gameState === END){

     fill("white");
     textSize(50);
     text("Press R to Restart", 500, 300);
     
//CHANGING THE ANIMATIONS WHEN;
    
//DINO DIES
     dino.changeAnimation("dead", dinoD);

//HUNTER ATTACKS
     hunter.changeAnimation("attacking", hunterA);
    
//SETTING THE POSITION FOR THE HUNTER WHEN THE HE CATCHES AND KILLS THE DINO
     hunter.x = 50;
     hunter.y = 525;
    


    
    
//THE HUNTER AND THE DINO CANNOT JUMP EVEN IF THE SPACE KEY IS PRESSED
     hunter.velocityY = 0;
     dino.velocityY = 0;
    
     dino.y = 550;
    
//THE OBSTACLES SHOULD STOP COMING TO THE DINO AS HE IS DEAD AND ALSO THE OBSTACLES SHOULD STOP MOVING
     obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
    
//THE OBSTACLES SHOULD DISAPPEAR FROM WHICH THE DINO FALLS
     obstaclesGroup.destroyEach();

     
     //THE GROUND STOPS MOVING
     jungle.velocityX = 0;
     
  if(keyDown("r")){
     reset();
}
} 
  
//COMMAND FOR THE COMPUTER TO DRAW THE SPRITES
     drawSprites();
   
//SHOWING THE SCORE
     fill("white");
     stroke("purple");
     textSize(25);
     text("Score: "+ score, 50, dino.y - 200);

     if(gameState ===END){
          fill("white");
     textSize(50);
     text("Press R to Restart", 500, 300);
     }
}


//FUNCTION FOR RESETTING THE GAME
 function reset(){
   
     gameState = PLAY;
   
     score = 0;
   
     hunter.changeAnimation("running", hunterR);
     dino.changeAnimation("saving", dinoR); 
   
     hunter.x = 60;
}


//FUNCTION FOR OBSTACLES
 function spawnObstacles(){
   
//THE OBSTACLES SHOULD COME AFTER EVERY 150 FRAMES
  if(frameCount % 150 === 0){
//LOCAL VARIABLE FOR OBSTACLES
   var obstacles = createSprite(650, 330, 20, 20);
    
//LOCAL VARIABLE FOR RANDOM
   var rand = Math.round(random(1,5));
   
//SWITCH STATEMENT FOR OBSTACLES BY USING RANDOM VARIABLE
    switch(rand) {
      case 1: obstacles.addImage(obs1);
              obstacles.scale = 0.25;
              obstacles.y = 555;
              break;
              
      case 2: obstacles.addImage(obs2);
              obstacles.scale = 0.4;
              obstacles.y = 569;
              break;
              
      case 3: obstacles.addImage(obs3);
              obstacles.scale = 0.25;
              obstacles.y = 590;
              break;
              
      case 4: obstacles.addImage(obs4);
              obstacles.scale = 0.25;
              obstacles.y = 590;
              break;
              
      case 5: obstacles.addImage(obs5);
              obstacles.scale = 2;
              obstacles.y = 540;
              break;
              
              default: break;
}
    
//MOVING THE OBSTACLES ACCORDING TO THE MOVEMENT OF THE JUNGLE
      obstacles.velocityX = -(4 + 3* score/500);
      obstacles.lifetime = 1000;
    
//ADDING THE OBSTACLES TO A GROUP
      obstaclesGroup.add(obstacles);
}
}



