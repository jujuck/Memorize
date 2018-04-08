//Création du menu central
function initCarte(numJeux) {
    var myRequestCarte = new XMLHttpRequest();
    myRequestCarte.open('GET','data/carte.json');

    myRequestCarte.onreadystatechange = function () {
        if(myRequestCarte.readyState === 4) {
            var carte =JSON.parse(myRequestCarte.responseText);
            var carteList = '<div class="container">';

            for(var i = 0; i < carte.length; i++) {
                carteList += '<div class="cartes">';
                carteList += '<h3>' + carte[i].name + '</h3>';
                carteList += '<p>' + carte[i].num + '</p>';
                carteList += '</div>';  
            }
            carteList += '</div>';
            document.getElementById('jeux' + numJeux).innerHTML = carteList;
            
            /*  var array = [];
            var a = 0;
            while (a < 25) {
                y = Math.floor(Math.random()*24)+1;
                for (var z = 0; z < array.length; z++) {
                    if (array[z] === y) {
                        error = 1;
                    } else {
                        array.push(y);
                        a ++;
                    }
                }
                console.log(array);
            }*/
        }
    };
    myRequestCarte.send();
};

function distribution() {
    initCarte(1);
    initCarte(2);
};

/*var x;
var a = 1;



/*Création du menu central
function initMenu () {
    var myRequestMenu = new XMLHttpRequest();
    myRequestMenu.open('GET','javascript/donneemenu.json');

    myRequestMenu.onreadystatechange = function () {
        if(myRequestMenu.readyState === 4) {
            var menu = JSON.parse(myRequestMenu.responseText);
            var menuList = '<div id="contenu">';

            for (var i = 0; i < menu.length; i += 1) {
                menuList += '<div class="bloc button">';
                menuList += '<h3>' + menu[i].name + '</h3>';
                menuList += '<p>' + menu[i].accroche + '</p>';
                menuList += '<button onclick="sendTheAJAX' + [i] + '()" class="go">GO</button>';
                menuList += '</div>';
                menuList += '</div>';

            }
        }
        document.getElementById('container').innerHTML = menuList;
    };
    myRequestMenu.send();
}

initMenu();*/