let countItem = 0;
calculBasket();

function calculBasket() {
    if (sessionStorage.getItem('basketItem' + countItem)) {
    countItem ++;
    calculBasket();
}}


var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var teddy = JSON.parse(this.responseText);

        let count = countItem;
        let listBasket = document.getElementById('listbasket');
        calculBasket();

        function calculBasket() {
            if(sessionStorage.getItem('basketItem' + count), count > -1) {
                let newItem = document.createElement('div');
                newItem.innerHTML = sessionStorage.getItem('basketItem' + count) ;
                listBasket.prepend(newItem)
                count --;
                calculBasket();
}}}} 

request.open("GET", "http://localhost:3000/api/teddies");
request.send();



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