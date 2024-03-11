const allBox = document.querySelectorAll(".pole");
const resultContainer = document.getElementById("wynik");
const restartBtn = document.getElementById("restart");

const checkList = [];
let currentPlayer = "CROSS";
let winStatus = false;
const BOX_NUMBERS = [0,1,2,3,4,5,6,7,8];
const BOX_MID_NUMBERS = [1, 3, 5, 7];
let userWinList = [];
let botWinList = [];

function areEqual(one, two) {
    if (one === two) return one;
    return false;
}

function checkEquality(currentPlayer, array) {
    for (const item of array) {
        const a = checkList[item[0]];
        const b = checkList[item[1]];
        if (areEqual(a, b) == currentPlayer) {
            return [item[0], item[1]];
        }
    }
    return false;
}

function blinkTheBox(val){
    if (val) {
        for (const i of val) {
            const box = document.querySelector(`[pole_numer="${i}"]`);
            box.classList.add("blink");
        }
        return true;
    }
    return false;
}

function isWin() {
    let val = false;
    if (checkList[0] == currentPlayer) {
        val = checkEquality(currentPlayer, [
            [1, 2],
            [3, 6],
            [4, 8],
        ]);
        if (val && blinkTheBox([0, ...val])) return true;
    }

    if (checkList[8] == currentPlayer) {
        val = checkEquality(currentPlayer, [
            [2, 5],
            [6, 7],
        ]);
        if (val && blinkTheBox([8, ...val])) return true;
    }

    if (checkList[4] == currentPlayer) {
        val = checkEquality(currentPlayer, [
            [1, 7],
            [3, 5],
            [2, 6],
        ]);
        if (val && blinkTheBox([4, ...val])) return true;
    }

    return val;
}

function checkWin(len) {
    if (len >= 3 && isWin()) {
        winStatus = true;
        if (currentPlayer == "CROSS") {
            resultContainer.innerText = "X Won the Match.";
        } else {
            resultContainer.innerText = "O Won the Match.";
        }
    } else if (len == 8) {
        winStatus = true;
        resultContainer.innerText = "= Match Draw.";
    }
    return winStatus;
}

function captureCenterOrCorner(){
    if(!checkList[4]){
        return 4;
    }
    else if(!checkList[2]){
        return 2;
    }
    else if(!checkList[6]){
        return 6;
    }
    else if(!checkList[8]){
        return 8;
    }
    return false;
}

function getBoxNumForBot(mainListLen) {
    let xWin = false;
    let dummyList = [];
    let dummyListLen;
    let dummyBoxNumbers = [];

    if (mainListLen === 1) {
        while (mainListLen < 9) {
            const boxNumForBot = Math.floor(Math.random() * 9);
            if (!checkList[boxNumForBot]) {
                return boxNumForBot;
            }
        } // while
    } else if (mainListLen === 3) {
        if (
            (checkList[0] && checkList[8] && checkList[0] == checkList[8]) ||
            (checkList[2] && checkList[6] && checkList[2] == checkList[6])
        ) {
            return BOX_MID_NUMBERS[Math.floor(Math.random() * 3)];
        }
    }
    

    dummyList = [...checkList];
    dummyListLen = dummyList.filter(Boolean).length;
    dummyBoxNumbers = [...BOX_NUMBERS]

    while(dummyListLen < 9 && dummyBoxNumbers.length){
        botWinList = []
        botWinList = [...checkList]
        let randNum = Math.floor(Math.random() * dummyBoxNumbers.length);
        let botNum = dummyBoxNumbers[randNum];
        if(!botWinList[botNum]){
            dummyList[botNum] = 'ZERO';
            botWinList[botNum] = 'ZERO';
            if(isWin('ZERO',botWinList,true)){
                return botNum;
            }
        }
        dummyBoxNumbers.splice(randNum,1);
    }// while

    dummyList = [];
    dummyList = [...checkList];
    dummyListLen = dummyList.filter(Boolean).length;
    dummyBoxNumbers = []
    dummyBoxNumbers = [...BOX_NUMBERS];

    while(dummyListLen < 9 && dummyBoxNumbers.length){
        userWinList = []
        userWinList = [...checkList]
        let randNum = Math.floor(Math.random() * dummyBoxNumbers.length);
        let botNum = dummyBoxNumbers[randNum];
        if(!userWinList[botNum]){
            dummyList[botNum] = 'CROSS';
            userWinList[botNum] = 'CROSS';
            if(isWin('CROSS',userWinList,true)){
                xWin = botNum;
                break;
            }
        }
        dummyBoxNumbers.splice(randNum, 1);

    }

    if(xWin === false && mainListLen === 3 && checkList[4] == 'ZERO'){
        if(!checkList[3] && !checkList[5]){
            return 3;
        }
        else if(!checkList[1]){
            return 1;
        }
        else if(!checkList[7]){
            return 7;
        }
    }
    return xWin;
}

function boxClickBotEasy(targetBox, player, boxNum) {
    checkList[boxNum] = player;
    targetBox.classList.add(player.toLowerCase());
}

function handleBoxClickBotEasy(e) {
    let len = checkList.filter(Boolean).length;
    const boxNum = parseInt(e.target.getAttribute("pole_numer"));
    let boxNumForBot;

    if (!winStatus && !checkList[boxNum]) {
        currentPlayer = "CROSS";
        boxClickBotEasy(e.target, "CROSS", boxNum);

        if (checkWin(len) === false) {
            len = checkList.filter(Boolean).length;
            currentPlayer = "ZERO";
            while (len < 9) {
                boxNumForBot = Math.floor(Math.random() * 9);
                if (!checkList[boxNumForBot]) {
                    boxClickBotEasy(allBox[boxNumForBot], "ZERO", boxNumForBot);
                    checkWin(len);
                    break;
                }
            }
        }
    }
}

function boxClickBotHard(targetBox, player, boxNum) {
    checkList[boxNum] = player;
    targetBox.classList.add(player.toLowerCase());
}

function handleBoxClickBotHard(e) {
    let len = checkList.filter(Boolean).length;
    const boxNum = parseInt(e.target.getAttribute("pole_numer"));
    let boxNumForBot;

    if (!winStatus && !checkList[boxNum]) {
        currentPlayer = "CROSS";
        boxClickBotHard(e.target, "CROSS", boxNum);

        if (checkWin(len) === false) {
            len = checkList.filter(Boolean).length;
            currentPlayer = "ZERO";
            boxNumForBot = getBoxNumForBot(len);

            if(boxNumForBot !== false){
                boxClickBotHard(allBox[boxNumForBot],'ZERO',boxNumForBot);
                checkWin(len);
                /// go on....
            }
            else{
                boxNumForBot = captureCenterOrCorner();
                if(boxNumForBot){
                    boxClickBotHard(allBox[boxNumForBot],'ZERO',boxNumForBot);
                    checkWin(len);
                }
                else{
                    while (len < 9) {
                        boxNumForBot = Math.floor(Math.random() * 9);
                        if (!checkList[boxNumForBot]) {
                            boxClickBotHard(allBox[boxNumForBot], "ZERO", boxNumForBot);
                            checkWin(len);
                            break;
                        }
                    } // while
                }
            }
        } // checkWin
    }
}

function boxClick2Players(e, player, boxNum){
    checkList[boxNum] = player;
    e.target.classList.add(player.toLowerCase());
    currentPlayer = (player === 'CROSS') ? 'CROSS' : 'ZERO';
}

function handleBoxClick2Players(e) {
    const len = checkList.filter(Boolean).length;
    const boxNum = parseInt(e.target.getAttribute("pole_numer"));

    if (!winStatus && !checkList[boxNum]) {
        if (len > 0 && currentPlayer == "CROSS") {
            boxClick2Players(e,'ZERO',boxNum);
        } else {
            boxClick2Players(e,'CROSS',boxNum);
        }

        checkWin(len);
    }
}

restartBtn.addEventListener("click", function () {
    allBox.forEach((item) => {
        item.classList.remove("cross", "zero", "blink");
    });
    checkList.length = 0;
    currentPlayer = "CROSS";
    resultContainer.innerText = "";
    winStatus = false;
});

document.getElementById('mode').addEventListener('change', function() {
    allBox.forEach((item) => {
        item.classList.remove("cross", "zero", "blink");
    });
    checkList.length = 0;
    currentPlayer = "CROSS";
    resultContainer.innerText = "";
    winStatus = false;

    var mode = this.value;
    if (mode === 'vs-bot') {
        document.getElementById('difficulty').style.display = 'block';
    } else {
        document.getElementById('difficulty').style.display = 'none';
    }
});

document.getElementById('difficulty').addEventListener('change', function() {
    allBox.forEach((item) => {
        item.classList.remove("cross", "zero", "blink");
    });
    checkList.length = 0;
    currentPlayer = "CROSS";
    resultContainer.innerText = "";
    winStatus = false;
});

function setupEventListeners() {
    allBox.forEach((item) => {
        item.addEventListener("click", function(e) {
            if (document.getElementById('mode').value === 'vs-bot') {
                if (document.getElementById('bot-difficulty').value === 'easy') {
                    handleBoxClickBotEasy(e);
                } else {
                    handleBoxClickBotHard(e);
                }
            } else {
                handleBoxClick2Players(e);
            }
        });
    });
}

setupEventListeners();



// let teraz_ruch = 'kolko';
// let czy_wygrana = false;

// const pola = document.querySelectorAll(".pole");

// document.getElementById('tryb').addEventListener('click', function() {
//     pola.forEach((item) => {
//         item.
//     });
// });

