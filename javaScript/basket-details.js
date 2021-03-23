/* calcul du nombre max du panier*/
let countItem = 0;
maxCalculBasket();

function maxCalculBasket() {
    if (sessionStorage.getItem('basketItem' + countItem)) {
    countItem ++;
    maxCalculBasket();
}}

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var teddy = JSON.parse(this.responseText);

        /*calcul des elements du panier*/
        let count = countItem - 1;
        let listBasket = document.getElementById('listbasket');
        let finalPrice = 0;
        calculItem();

        function calculItem() {
            if(sessionStorage.getItem('basketItem' + count), count > -1) {
                itemSelect = sessionStorage.getItem('basketItem' + count);

                /*calcul du prix de chaque elements*/
                let newItemPrice = document.createElement('div');
                newItemPrice.classList.add ('col-3');
                newItemPrice.classList.add ('border');
                teddyPrice = teddy[itemSelect]["price"]/100;
                finalPrice += teddyPrice;
                newItemPrice.innerHTML = teddyPrice.toFixed(2) + ' €';
                listBasket.prepend(newItemPrice);

                /*calcul du nom de chaque elements*/
                let newItemName = document.createElement('div');
                newItemName.classList.add ('col-5');
                newItemName.classList.add ('border');
                newItemName.innerHTML = teddy[itemSelect]['name'];
                listBasket.prepend(newItemName);

                /*calcul du prix total*/
                let totalPrice = document.getElementById ('total-price');
                totalPrice.innerHTML = finalPrice.toFixed(2) + ' €';
                count --;
                calculItem();
            }
}}} 

request.open("GET", "http://localhost:3000/api/teddies");
request.send();

/*bouton finaliser ma commande*/
function changeStage(){
document.getElementById('button-finalization').style.display = 'none';
document.getElementById('fieldset').style.display ='block';
}
buttonFinal = document.getElementById('button-finalization')
buttonFinal.onclick = changeStage;

/*promises
à chaque changement d'etat (touche au clavier)
lance une fonction avec pleins de if
pour chaque if, renvoie une promise qui dit l'erreur
si il n'y a pas d'erreur, débloque le bouton*/

var formular = document.getElementById('formulaire')

/*function changement(){
    let test = document.getElementById('test');
    testtest = document.createElement('div');
    testtest.innerHTML ='ok';
    test.prepend(testtest);
}*/

let button = document.getElementById('button').disabled="false";
function sendData(data){
    let test = document.getElementById('test');
    test.innerHTML = data['test'];
    /*alert('test');*/
}

/*exemple de base pour le formulaire */
/* chaque ligne du formulaire donne une promise et balance une erreur suivant le resultat*/
/*const clef = true;

function fonctionale (resolve, reject) {
    if(clef){
    console.log ("han");
    resolve ('bien vu');

    }else{
    console.log ("fiotte");
    reject ('merde');
}}

var projet = new Promise (fonctionale);
projet.then (function(data){ 
    console.log ('sa  marche ! ' + data);
});
projet.catch (function(data) { 
    console.log ("t'es qu'un gros con " + data);
})*/