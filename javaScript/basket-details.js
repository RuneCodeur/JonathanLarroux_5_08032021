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
        startPrice = 0;
        let listBasket = document.getElementById('listbasket');
        /*nettoye le json */
        calculItem();
    
        

        function calculItem() {
            if(sessionStorage.getItem('basketItem' + count), count > -1) {
                itemSelect = sessionStorage.getItem('basketItem' + count);

                /*intègre au json */

                /*calcul du prix de chaque elements*/
                let newItemPrice = document.createElement('div');
                newItemPrice.classList.add ('col-4');
                newItemPrice.classList.add ('border');
                newItemPrice.classList.add('col-sm-3');
                teddyPrice = teddy[itemSelect]["price"]/100;
                let finalPrice = new Promise((resolve) =>{
                    startPrice += teddyPrice;
                    resolve(startPrice);
                });
                newItemPrice.innerHTML = teddyPrice.toFixed(2) + ' €';
                listBasket.prepend(newItemPrice);

                /*calcul du nom de chaque elements*/
                let newItemName = document.createElement('div');
                newItemName.classList.add ('col-5');
                newItemName.classList.add ('border');
                newItemName.innerHTML = teddy[itemSelect]['name'];
                listBasket.prepend(newItemName);

                /*calcul du prix total*/
                finalPrice.then((value)=>{
                let totalPrice = document.getElementById ('total-price');
                totalPrice.innerHTML = value.toFixed(2) + ' €';
                });
                count --;
                calculItem();
}}}} 
request.open("GET", "http://localhost:3000/api/teddies");
request.send();

/*bouton finaliser ma commande*/
function changeStage(){
document.getElementById('button-finalization').style.display = 'none';
document.getElementById('fieldset').style.display ='block';
}
buttonFinal = document.getElementById('button-finalization');
buttonFinal.onclick = changeStage;

/*final button, envoie le formulaire puis le json */