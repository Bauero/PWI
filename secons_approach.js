const warunki_wygranej = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

const pola = document.querySelectorAll(".pole");
const wynik = document.querySelector("#wynik");
const restart = document.querySelector("#restartBtn");

initializeGame();

function initializeGame(){
    pola.forEach(pole => pole.addEventListener("click", poleClicked));
    restartBtn.addEventListener("click", restartGame);
    running = true;
}

function poleClicked(){
    const pole_numer = this.getAttribute("pole_numer");

    if(options[pole_numer] != "" || !running){
        return;
    }

    updateCell(this, pole_numer);
    checkWinner();
}

function updateCell(pole, index){
    options[index] = currentPlayer;
    pole.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    wynik.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < warunki_wygranej.length; i++){
        const condition = warunki_wygranej[i];
        const poleA = options[condition[0]];
        const poleB = options[condition[1]];
        const poleC = options[condition[2]];

        if(poleA == "" || poleB == "" || poleC == ""){
            continue;
        }
        if(poleA == poleB && poleB == poleC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        wynik.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        wynik.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    wynik.textContent = `${currentPlayer}'s turn`;
    pola.forEach(pole => pole.textContent = "");
    running = true;
}