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

let dostepne_pola_planszy = [0,1,2,3,4,5,6,7,8];
const WSZYSTKIE_POLA = [0,1,2,3,4,5,6,7,8];
let lista_wspomagajaca = [];
let pola_krzyz = [];
let pola_kolo = [];
let strategia = [];
const POLA_SRODEK_BOK = [3, 1, 5, 7];
let userWinList = [];
let botWinList = [];

let czyja_tura = "X";
let czy_gra_trwa = true;

const pola = document.querySelectorAll(".pole");
const wynik = document.querySelector("#wynik");
const restart = document.querySelector("#restart");

function czy_wygrana(listaNumerow) {
    for (const warunek of warunki_wygranej) {
        let czyZawieraWarunek = true;
        for (const numer of warunek) {
            if (!listaNumerow.includes(numer)) {
                czyZawieraWarunek = false;
                break;
            }
        }
        if (czyZawieraWarunek) {
            return true;
        }
    }
    return false;
}

function sprawdz_stan_wygrania(){
    stan_X = czy_wygrana(pola_krzyz);
    stan_O = czy_wygrana(pola_kolo);

    if (stan_X ){
        return 'X';
    }
    else if (stan_O) {
        return 'O'
    }
    else if (dostepne_pola_planszy.length == 0){
        return 'remis';
    }
}

function poleClick2Players(e, player, boxNum) {
    lista_wspomagajaca[boxNum] = player;
    console.log(e,player,boxNum);
    dostepne_pola_planszy =  dostepne_pola_planszy.filter(element => element !== boxNum);
    if (czyja_tura === "X"){
        pola_krzyz.push(boxNum);
        e.target.classList.add(player);
        czyja_tura = "O";
    } else {
        pola_kolo.push(boxNum);
        e.target.classList.add(player);
        czyja_tura = "X";
    }
}

function poleClick1Player(e, boxNum){
    lista_wspomagajaca[boxNum] = 'X';
    dostepne_pola_planszy =  dostepne_pola_planszy.filter(element => element !== boxNum);
    pola_krzyz.push(boxNum);
    e.target.classList.add('krzyz');
    czyja_tura = "O";
}

function poleClickBot(boxNum){
    lista_wspomagajaca[boxNum] = "O";
    pola.forEach(element => {
        if (parseInt(element.getAttribute('pole_numer')) === boxNum) {
            element.classList.add('kolo');
        }
    });
    dostepne_pola_planszy =  dostepne_pola_planszy.filter(element => element !== boxNum);
}

function wyborPolaBotLatwy(){
    return dostepne_pola_planszy[Math.floor(Math.random() * dostepne_pola_planszy.length)];
}

function czyElementJestSrodkiemBoku(){
    if(!lista_wspomagajaca[4]){
        return 4;
    }
    else if(!lista_wspomagajaca[2]){
        return 2;
    }
    else if(!lista_wspomagajaca[6]){
        return 6;
    }
    else if(!lista_wspomagajaca[8]){
        return 8;
    }
    return false;
}

function losowanieNumeruBot(mainListLen) {
    let listaPomocnicza = [];
    let numeryPomocnicze = [];
    let listaPomocniczaLen;
    let wygraX = false;

    if (mainListLen === 1) {
        while (mainListLen < 9) {
            const boxNumForBot = Math.floor(Math.random() * 9);
            if (!lista_wspomagajaca[boxNumForBot]) {
                return boxNumForBot;
            }
        }
    } else if (mainListLen === 3) {
        if (
                (lista_wspomagajaca[0] &&
                lista_wspomagajaca[8] &&
                lista_wspomagajaca[0] == lista_wspomagajaca[8]) 
                ||
                (lista_wspomagajaca[2] &&
                lista_wspomagajaca[6] && 
                lista_wspomagajaca[2] == lista_wspomagajaca[6])) 
                {
            return POLA_SRODEK_BOK[Math.floor(Math.random() * 3)];
        }
    }
    

    listaPomocnicza = [...lista_wspomagajaca];
    listaPomocniczaLen = listaPomocnicza.filter(Boolean).length;
    numeryPomocnicze = [...WSZYSTKIE_POLA]

    while(listaPomocniczaLen < 9 && numeryPomocnicze.length){
        botWinList = []
        botWinList = [...lista_wspomagajaca]
        let randNum = Math.floor(Math.random() * numeryPomocnicze.length);
        let botNum = numeryPomocnicze[randNum];
        if(!botWinList[botNum]){
            listaPomocnicza[botNum] = 'X';
            botWinList[botNum] = 'O';
            if(sprawdz_stan_wygrania() === '0'){
                return botNum;
            }
        }
        numeryPomocnicze.splice(randNum,1);
    }

    listaPomocnicza = [];
    listaPomocnicza = [...lista_wspomagajaca];
    listaPomocniczaLen = listaPomocnicza.filter(Boolean).length;
    numeryPomocnicze = []
    numeryPomocnicze = [...WSZYSTKIE_POLA];

    while(listaPomocniczaLen < 9 && numeryPomocnicze.length){
        userWinList = []
        userWinList = [...lista_wspomagajaca]
        let randNum = Math.floor(Math.random() * numeryPomocnicze.length);
        let botNum = numeryPomocnicze[randNum];
        if(!userWinList[botNum]){
            listaPomocnicza[botNum] = 'X';
            userWinList[botNum] = 'O';
            if(sprawdz_stan_wygrania() === 'X'){
                wygraX = botNum;
                break;
            }
        }
        numeryPomocnicze.splice(randNum, 1);

    }

    if(wygraX === false && mainListLen === 3 && lista_wspomagajaca[4] == 'O'){
        if(!lista_wspomagajaca[3] && !lista_wspomagajaca[5]){
            return 3;
        }
        else if(!lista_wspomagajaca[1]){
            return 1;
        }
        else if(!lista_wspomagajaca[7]){
            return 7;
        }
    }
    return wygraX;
}

function wyborPolaBotTrudny() {
   
    len = lista_wspomagajaca.filter(Boolean).length;
    czyja_tura = "O";
    boxNumForBot = losowanieNumeruBot(len);

    if(boxNumForBot !== false){
        poleClickBot(boxNumForBot);
    }
    else{
        boxNumForBot = czyElementJestSrodkiemBoku();
        if(boxNumForBot){
            poleClickBot(boxNumForBot);
        }
        else{
            while (len < 9) {
                boxNumForBot = Math.floor(Math.random() * 9);
                if (!lista_wspomagajaca[boxNumForBot]) {
                    poleClickBot(boxNumForBot);
                    break;
                }
            }
        }
    }

}

function updateStan(e) {
    const len = pola_kolo.length + pola_krzyz.length;
    const boxNum = parseInt(e.target.getAttribute("pole_numer"));
    const tryb = document.getElementById('tryb').value;

    console.log(tryb);

    if (czy_gra_trwa === true && (!pola_krzyz.includes(boxNum) && !pola_kolo.includes(boxNum))){
        if (tryb === "dwoch_graczy"){
            if (czyja_tura == "X") {
                poleClick2Players(e,'krzyz',boxNum);
            } else {
                poleClick2Players(e,'kolo',boxNum);
            }
        } else {
            poleClick1Player(e,boxNum);

            const odp = sprawdz_stan_wygrania();

            if (odp === "X" ){
                czy_gra_trwa = false;
                wynik.innerText = "Wygrywa X";
                return
            }
            else if (odp === "remis"){
                czy_gra_trwa = false
                wynik.innerText = "Remis";
                return
            }

            const poziom = document.getElementById("bot-trudnosc").value;
            console.log(poziom);
            if (poziom === 'latwy'){
                poleClickBot(wyborPolaBotLatwy());
            } else {
                poleClickBot(wyborPolaBotTrudny());
            }
        }
        const odp = sprawdz_stan_wygrania();

        if (odp === "X" ){
            czy_gra_trwa = false;
            wynik.innerText = "Wygrywa X";
        }
        else if (odp === "O") {
            czy_gra_trwa = false;
            wynik.innerText = "Wygrywa O";
        }
        else if (odp === "remis"){
            czy_gra_trwa = false
            wynik.innerText = "Remis";
        }
    }
}

pola.forEach((item) => {
    item.addEventListener("click", function(e) {
        updateStan(e);
    })
});

function czysc_plansze(){
    pola.forEach((item) => {
        item.classList.remove("krzyz", "kolo");
        item.removeEventListener('click', function() {});
    });
    dostepne_pola_planszy = [0,1,2,3,4,5,6,7,8];
    czyja_tura = "X";
    wynik.innerText = "";
    pola_kolo = [];
    pola_krzyz = [];
    czy_gra_trwa = true;
}

restart.addEventListener("click", function () {
    czysc_plansze();
});

document.getElementById('tryb').addEventListener('change', function() {
    
    czysc_plansze();

    console.log("Zmiana trybu gry");

    var mode = this.value;
    if (mode === 'bot') {
        document.getElementById('trudnosc').style.display = 'block';
    } else {
        document.getElementById('trudnosc').style.display = 'none';
    }

});

document.getElementById('trudnosc').addEventListener('change', function() {
    czysc_plansze();
});