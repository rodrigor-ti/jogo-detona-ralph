const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives:5,
        gameOver: false,
        soundInit: null,
    },
    actions: {
        timerId: setInterval(randomSquareEnemy, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`)
    audio.volume = 0.2;
    audio.play();
}

function startSoundInit(){
    state.values.soundInit = new Audio(`./src/audios/audio-game.mp3`);
    state.values.soundInit.volume=0.05;
    state.values.soundInit.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0)
        gameOver();
}

function gameOver(){
    if(!state.values.gameOver){
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
        state.values.lives=0;
        state.values.soundInit.pause();
        playSound('game-over');
        alert('Game Over! O seu resultado foi: ' + state.values.result);
        state.values.gameOver=true;
    }
}

function randomSquareEnemy(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumberEnemy = Math.floor(Math.random() * 9);
    let randomSquareEnemy = state.view.squares[randomNumberEnemy];

    randomSquareEnemy.classList.add("enemy");
    state.values.hitPosition = randomSquareEnemy.id;
}


function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition && state.values.lives > 0 && state.values.currentTime > 0){
                playSound('hit');
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            }else{
                playSound('err');
                if(state.values.lives <= 0){
                    gameOver();
                }else{
                    state.values.lives--;
                    state.view.lives.textContent = state.values.lives;
                }
            }
        });
    });
}

function init() {
    startSoundInit();
    state.view.lives.textContent = state.values.lives;
    addListenerHitBox();
}

init();