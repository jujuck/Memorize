//création des variables
var tour = 1;
var points = 0;
var nbTry = 0;
var numBoucle = 0;
var canPlay = true; //Enable et disable l'appel au onclick
var carteJouée1;
var carteJouée2;
var secondes = 0;
var minutes = 0;

//Définition des élements d'affichage à modifier
var pointsElt = document.getElementById("points");
var nbTryElt = document.getElementById("nbTry");
var difficulteElt;
var tpsJeuxElt = document.getElementById("tpsJeux");
var distributionElt = document.getElementById("distribution");
var recommencerElt = document.getElementById("recommencer");

//fonction de mise à jour de l'affihcage du score
function affichageScore() {
    pointsElt.innerHTML = points;
    nbTryElt.innerHTML = nbTry;
    if (points === (4 + (difficulteElt*4))) {
        
        alert("féliciations, vous avez réussi!!!");
    }
}

//fonction chrono
function chrono() {
    setInterval(function () {
        secondes ++;
        if (secondes === 60){
            minutes++;
            secondes = 0;
        }
        tpsJeuxElt.innerHTML = minutes + " : " + secondes;
    }, 1000);
}

//function de jouer
function jouer(IdCarte, Value) {

    //Sélection des 2 cartes
    if (tour === 1 && canPlay === true) {
    carteJouée1 = document.getElementById("carte" + IdCarte);
    carteJouée1.classList.add("vu");
    carteJouée1.value = Value;
    tour++;
    } else if (tour === 2 && canPlay ===true) {
        canPlay = false;
        carteJouée2 = document.getElementById("carte" + IdCarte);
        carteJouée2.classList.add("vu");
        carteJouée2.value = Value;
        
        //Vérification des cartes et temps de mémorisation
        setTimeout(function() {
            if (carteJouée1.value === carteJouée2.value) {
                points++;
                console.log(points);
                carteJouée1.classList.add("validee");
                carteJouée2.classList.add("validee");
                carteJouée1.onclick= null;
                carteJouée2.onclick = null;
            } else {
                carteJouée1.classList.remove("vu");
                carteJouée2.classList.remove("vu");
            }
            canPlay = true;
        }, 3000);
        tour = 1;
        nbTry++;
        //Mise à jour de l'affichage
        affichageScore();
    }
}

//Création du menu central
function initCarte(numJeux) {
    var myRequestCarte = new XMLHttpRequest();
    myRequestCarte.open('GET','data/carte.json');

    myRequestCarte.onreadystatechange = function () {
        if(myRequestCarte.readyState === 4) {
            var carte =JSON.parse(myRequestCarte.responseText);
            var carteList = '<div class="container">';

            for(var i = 0; i < (4 + (difficulteElt*4)); i++) {
                var y = Math.floor(Math.random()*((4 + (difficulteElt*4)) -numBoucle));
                if (y !== -1) {
                carteList += '<div class="cartes" onclick="jouer(' + carte[y].num + ',' + carte[y].value + ')" id="carte' + carte[y].num + '">';
                carteList += '<h3>' + carte[y].name + '</h3>';
                carteList += '</div>';
                carte.splice((y), 1);
                numBoucle++;
                }
            }
            carteList += '</div>';
            document.getElementById('jeux' + numJeux).innerHTML = carteList;
        }
    };
    myRequestCarte.send();
};

function distribution() {
    distributionElt.style.display ="none";
    recommencerElt.style.display= "inline";
    difficulteElt = document.getElementById("difficulte").value;
    initCarte(1);
    affichageScore();
    chrono();
};

function recommencer() {
    window.location.reload();
}

