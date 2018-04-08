//création des variables
var numBoucle = 0;
var tour = 1;
var points = 0
var carteJouée1;
var carteJouée2;


//function de jouer
function jouer(IdCarte, Value) {
    

    //Sélection des 2 cartes
    if (tour === 1) {
    carteJouée1 = document.getElementById("carte" + IdCarte);
    carteJouée1.classList.add("vu");
    carteJouée1.value = Value;
    tour++;
    } else {
        carteJouée2 = document.getElementById("carte" + IdCarte);
        carteJouée2.classList.add("vu");
        carteJouée2.value = Value;
        
        setTimeout(function() {
            if (carteJouée1.value === carteJouée2.value) {
                points++;
                carteJouée1.classList.add("validee");
                carteJouée2.classList.add("validee");
            } else {
                carteJouée1.classList.remove("vu");
                carteJouée2.classList.remove("vu");
            }
        }, 5000);
        
        tour = 1;
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

            for(var i = 0; i < 16; i++) {
                var y = Math.floor(Math.random()*(16 -numBoucle));
                if (y !== -1) {
                console.log(y);
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
    initCarte(1);
};

