// to take input from user
var Name = document.getElementById("name");
let speed = 0;
let name = prompt("WELCOME TO SNAKE GAME WORLD ! \n \n please Enter your name: ");
if(name != null){
    Name.innerHTML="Welcome to Snake Game " + name+" !"
    var enterSpeed = prompt("Please enter speed (any number), in which we can want to play. \n slow speed is: 1 \n Average speed is: 8 \n heigh speed is: 20\n By default speed is 9");
    if(speed == null){      
        speed = 6;
    }
    else {
        speed = enterSpeed ;

    }
}else{
    Name.innerHTML="Welcome to Snake Game " + " Prakash Goyal !"
    speed = 8;
}




// Game variables and constatnt
let inputDirection = {x: 0, y: 0}; // bcz game starts with this position..
const foodSound = new Audio("foodSound.mp3");// jab food kahega to sound niklega.
const gameOverSound = new Audio("gameOverSound.mp3"); //   
const moveSound = new Audio("moveSound.mp3");
const musicSound = new Audio("musicSound.mp3");
let score = 0;
let lastPaintTime = 0; // lastPaintTime bole to last time kb aapke screen paint huie thi. Screen Paint = ek baar game loop complete . 
let snakeArray = [ 
    { x: 13, y: 15 } 
];
food = {x: 6, y: 7};



//    Game function parts.
function main(currentTime){
   // document.write("prakash");
    window.requestAnimationFrame(main);
    if((currentTime - lastPaintTime)/1000 < 1/speed) { // current Time and last paint time dono mili second me hai
        return;
    }
    lastPaintTime = currentTime;//yaha tk mera loop time slow ho gaya
    //console.log(currentTime);
    gameEngine();
}

// --------------  COLLIDE kiya to kya karna hai
function isCollide(snake){ 
      // If you bump into yourself 
      for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 25 || snake[0].x <=0 || snake[0].y >= 25|| snake[0].y <=0){
        return true;
    }
    return false ;
}


// --------- game Engine part
function gameEngine(){
    // part 1 = updating the snake array i.e. basically object ka array  and Food 
    // ------    if snake collide karega to kya hoga
    if(isCollide(snakeArray)){ // if collide kr jaye to 
        gameOverSound.play(); // game over sound ko play karo
        musicSound.pause(); // and then music sound ko pause karo
        inputDirection = {x: 0, y: 0}; // and then input direction ko reset karo
        var alertOutput = alert("Game Over. Press any key to play again!");
        snakeArray = [ 
            { x: 13, y: 15 } // reset the snake array , we consider initiol position of snake.
        ];
        musicSound.play(); // game restart again
        if(alertOutput == undefined)
            score = 0; // score ko starts kr diye
        
    }


     
    // ----- Agr khana kha liya to hume score increase and regenerate the food karna hai.
    // khana kb khayega -- jb snake ka mundi ka cordinate and food ka cordinate same hoga.
    // cordinate bole to x and y both i.e.
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        foodSound.play();

        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;

        // unshift method array me aage se ek element jo argument me paas karte hai add kr deta hai.
        snakeArray.unshift({x: snakeArray[0].x + inputDirection.x , y: snakeArray[0].y + inputDirection.y});
            //so x and y ko update kr diye hai
            // ab food kha liya to hume new food generate karna hai by math.round()
            let a = 2; // a and b is grid edge value jaha se jaha tk randome number generate karna hai
            let b = 16; // a=2 and b= 16 saftey ke liye hai hum a=1 and b= 18 v le sakte hai but not out of that bcz grid khatm ho jayega.
            food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}        
    }

    // ------ Now to move to snake  body 
    // see carefully decrementing for loop
    for(let i= snakeArray.length - 2; i >= 0; i--){
    // isse hum array ke element ko khiska rahe hai
    // snakeArray[i+1] = snakeArray[i]; wrong bcz sara element ek ko poit karega and last wala vacent ko point karne lagega
    // is problem ke liye use kare... and {...snakeArray[i]} representing new array object of same name .
    snakeArray[i+1] = {...snakeArray[i]};
    }
    snakeArray[0].x += inputDirection.x; // last index s & y both ko update kr denge .
    snakeArray[0].y += inputDirection.y;



    // part 2 = Display the snake and food
    // display the snake

  
    //var board = document.getElementById("board");
    board.innerHTML=""; // yaha se board  empty ho jayega agr koi element hoga to
    snakeArray.forEach((e, index) => {// snake ke hr element ko access krne ke liye forEach() method ko call kiye hai jo apne andar ek array function leha.
        //and e=element in array;  index = index of array
        snakeElement = document.createElement('div'); // yaha se html me div naam se ek element create ho jayega/
        snakeElement.style.gridRowStart = e.y; // yaha se x ke direction me jayenge
        snakeElement.style.gridColumnStart = e.x;// yaha se y ke dirction me jayenge
        // upar do line se basically ek box ko represent kr raha hai.
        //snakeElement.classList.add('food'); // ye snakeElement me  food naam ka variable add kr dega
        // hum upar ek class add kr rahe bcz hume css dalni hai, ek ek kr ke dalenge to dikkat hogi so class banaye hai
        if(index === 0){
            snakeElement.classList.add('head');
        }else{//index 0 nahi huaa to body ka color ko change kr do.
            snakeElement.classList.add('snake');// yaha se snake naam ka class add ho raha hai jo ki snake ke body except head ko represent karega.
        }
     
        board.appendChild(snakeElement); // ye snakeElement ko board ke child me jor or append kr dega
        
    });
    // Display the food   // lly display snake ki tarah hi food ko v display kiye hai
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}

 



//        main logic for game

musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}


window.requestAnimationFrame(main);
//----------     Action Part
window.addEventListener('keydown', e =>{ // e bole to element in array
    inputDirection = {x: 0, y: 1} //  position is changed i.e. start the game 
    moveSound.play(); // if any key is press from keyboard then sond play.
    switch(e.key){
        case "ArrowUp":
            console.log("ArrayUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrayDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrayLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrayRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
        
        default :
            break; 
    }
}); 
// ------ Action part from keyboard is end
