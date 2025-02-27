//---------------------------- TO CHECK IF GAME HAS STARTED ------------------------------------------------------------------------------------------------------------
let started = false; //game has not started yet 
let level = 0;

//koi bhi key press hone pe detect hojae, for that we use eventListener. 

document.addEventListener("keypress", function(){
    // console.log("game started");
    //game ek hi baar start ho sakta hai, so we make this condition:
    if(started==false){
        console.log("game is started");
        started=true;

        levelUp();
    }
});

//---------------------------- FLASHING THE BUTTONS ----------------------------------------------------------------------------------------------------------------------------------
//automatic flash by game
function gameFlash(btn){
    btn.classList.add("gameflash"); //css class added
    setTimeout(function(){
        btn.classList.remove("gameflash");
    }, 250);   
}
//flash by user on pressing
function userFlash(btn){
    btn.classList.add("userflash"); //css class added
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);   
}

//------------------------- GENERATING RANDOM COLORS FOR GAME SEQUENCE ------------------------------------------------------------------------------------------------------------------------
let gameSeq=[];

let btns=["yellow","red","purple","green"];
//colors mese random no. choose karna hai. i.e random INDEX 
function levelUp(){
    //1. level ko badhana 
    //2. button ko flash karana- automatically and also when user clicks on it. 
    //3. level ki val update karni 
    userSeq=[]; //this array is reset so that when level increases, user has to add color seq from start. 

    level++;
    h2.innerText=`Level ${level}`;

    let randomIndex = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIndex];
    let randomButton = document.querySelector(`.${randomColor}`);
    
    gameSeq.push(randomColor);
    console.log(gameSeq);
    // console.log(userSeq);
    gameFlash(randomButton);
    //now to check if user has pushed correct color at end we checkAns:
}

//---------------------------- SEQUENCE GENERATED BY USER ----------------------------------------------------------------------------------------------------------------------------------
let userSeq=[];

let allBtns = document.querySelectorAll(".btn"); //selecting all buttons
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function btnPress(){
    //console.log(this); //detects which button was pressed.
    //storing this val inside a button variable.
    let btn=this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

//---------------------------- CHECKING IF USER SEQ = GAME SEQ --------------------------------------------------------------------------------------------------------------------------------
let h2=document.querySelector("h2");
let h3=document.querySelector("h3");

let highestScore = 0;

function checkAns(idx){
    console.log("current level: ", level);
    //now we hv to check if userSeq and gameSeq's last val in index is same or not. 
    //let idx=level-1; 
    //as idx val starts from 0 hence to make it equal to level, we do level-1
    //upper index is fixed. so we add index to checkAns
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000); //LEVEL UPDATES HERE
        }
    }else{
        if(level > highestScore){
            highestScore = level;
        }
        // innerText changed to innerHTML as we cant give tags inside Text. 
        h2.innerHTML=`Game Over! Your Score was <b>${level}</b> <br> Press any key to start again.`;
        h3.innerHTML=`Highest score: ${highestScore}`;
        
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

//---------------------------- RESET WHEN USER SEQ != GAME SEQ ----------------------------------------------------------------------------------------------------------------------------------
function reset(){
    started = false; //as on line 15 it is set to true forever
    gameSeq = [];
    userSeq = [];
    level = 0;
}









