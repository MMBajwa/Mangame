
//board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

//dino
let dinoWidth = 50;
let dinoHeight = 60;
let dinoX = 45;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

//cactus
let cactusArray = [];

let virus1Width = 60;
let cactus2Width = 65;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;

//physics
let velocityX = -7.5; //cactus moving left speed
let velocityY = 0;
let gravity = .5;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); 
    dinoImg = new Image();
    dinoImg.src = "Untitled.png";
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "virus.png";

    cactus2Img = new Image();
    cactus2Img.src = "cloakedman.png";

    requestAnimationFrame(update);
    setInterval(placeCactus, 1000); 
    document.addEventListener("keydown", moveDino);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);
    
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY); //apply gravity to current dino.y, making sure it doesn't exceed the ground
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    
    //cactus
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
        
        if (detectCollision(dino, cactus)) {
            gameOver = true;
            dinoImg.src = "./img/dino-dead.png";
            dinoImg.onload = function() {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
        }
    }

    //score
    context.fillStyle="white";
    context.font="20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function moveDino(e) {
    if (gameOver) {
        return;
    }
    
    if ((e.code == "Space" || e.code == "ArrowUp"||e.type == "touchstart") && Math.abs(dino.y - dinoY) < 1) {
        velocityY = -10; // jump

    if (e.code == "ArrowDown" && dino.y == dinoY) {
 
   
       }
       
    }
}
    
    function placeCactus() {
        if (gameOver) {
            console.log("Gameover");
        return;
    }

    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height: cactusHeight
    }

    let placeCactusChance = Math.random(); //0 - 0.9999...

   
     if (placeCactusChance > .70) { //30% you get cactus2
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .50) { //50% you get cactus1
        cactus.img = cactus1Img;
        cactus.width = virus1Width;
        cactusArray.push(cactus);
    }
    
    if (cactusArray.length > 5) {
        cactusArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
}

function detectCollision(a, b)
{
    const isColliding =
        a.x < b.x + b.width &&   
        a.x + a.width > b.x &&   
        a.y < b.y + b.height &&   
        a.y + a.height > b.y;    
        
        if (isColliding) {
            const container = document.querySelector('.container'); // Select the container
            container.textContent = " This was just a warning: stay away from threats and be a safe cyber citizen! ";
            console.log("Collision detected!");
            alert("You collided, stay away from threats and be safe!");
        }
  
    
    return isColliding;
}
function reload(){

location.reload()

 }

