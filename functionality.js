var visMenu = false;
var popupCookie = document.getElementById('popupCookie');
var przyciskRozumiem = document.getElementById('przyciskRozumiem');
var closeBtn = document.getElementsByClassName('close')[0];

const teksty = {
    triatlonowy: {
        PL: "Triatlonowy",
        EN: "Triathlon"
    },
    szosowy: {
        PL: "Szosowy",
        EN: "Road bike"
    },
    transportowy: {
        PL: "Transportowy",
        EN: "Cargo bike"
    },
    miejski: {
        PL: "Miejski",
        EN: "City bike"
    },
    gravel: {
        PL: "Gravel",
        EN: "Gravel"
    },
    xc: {
        PL: "XC",
        EN: "XC"
    },
    trail: {
        PL: "Trail",
        EN: "Trail"
    },
    enduro: {
        PL: "Enduro",
        EN: "Enduro"
    },
    downhill: {
        PL: "Zjazdowy",
        EN: "Downhill"
    },
    
};


// Funkcje odnoścnie całego okna


window.onresize = zamknijMenu;

function cookiePopup() {
    popupCookie.style.display = 'block';
}

window.onload = function() {
    cookiePopup();
}

przyciskRozumiem.onclick = function() {
    popupCookie.style.display = 'none';
}


// Zarządzanie menu


function zamknijMenu() {
    var menuList = document.querySelector('.menu-list');
    if (window.innerWidth > 1000)
    {
        visMenu = false;
        menuList.style.display = 'none';
    }
}

function pokazMenuLista() {
    var menuList = document.querySelector('.menu-list');
    if (!visMenu) {
        menuList.style.display = 'block';
    } else {
        menuList.style.display = 'none';
    }
    visMenu = !visMenu;
}


// Wyświetlanie odpowiednich rowerów


function wyswietlRower(category) {
    var rowery = document.querySelectorAll('.rower');
    rowery.forEach(function(rower) {
        if (rower.id === category) {
            rower.classList.add('active');
        } else {
            rower.classList.remove('active');
        }
    });
    document.querySelector('.menu-list').style.display = 'none';
    visMenu = false;
}


function powrot() {
    wyswietlRower('Powitalny')
}

// Wykonywanie zmiany tekstu w zależności od wybranego języka


function zmienTekst(jezyk) {
    const przyciski = document.querySelectorAll('.menu a');
    przyciski.forEach(przycisk => {
        const rodzajRoweru = przycisk.id;
        przycisk.textContent = teksty[rodzajRoweru.replace("przycisk_","")][jezyk];
    });

    const paski = document.querySelectorAll(".menu-list div");
    paski.forEach(pasek => {
        const idPaska = pasek.id;
        pasek.textContent = teksty[idPaska.replace("pasek_","")][jezyk];
    });

    var tekstPL = document.querySelectorAll('.tekst-pl');
    var tekstEN = document.querySelectorAll('.tekst-en');
    var naglowekPL = document.querySelectorAll('.naglowek-pl');
    var naglowekEN = document.querySelectorAll('.naglowek-en');
    var tytolPL = document.querySelector('.tytul-pl');
    var tytolEN = document.querySelector('.tytul-en')

    if (jezyk === 'PL') {

        tytolPL.style.display = 'block';
        tytolEN.style.display = 'none';

        tekstPL.forEach(function(element) {
            element.style.display = 'block';
        });
        tekstEN.forEach(function(element) {
            element.style.display = 'none';
        });
        naglowekPL.forEach(function(element) {
            element.style.display = 'block';
        });
        naglowekEN.forEach(function(element) {
            element.style.display = 'none';
        });

    } else if (jezyk === 'EN') {

        tytolPL.style.display = 'none';
        tytolEN.style.display = 'block';

        tekstPL.forEach(function(element) {
            element.style.display = 'none';
        });
        tekstEN.forEach(function(element) {
            element.style.display = 'block';
        });
        naglowekPL.forEach(function(element) {
            element.style.display = 'none';
        });
        naglowekEN.forEach(function(element) {
            element.style.display = 'block';
        });
    }
}
