/*calcul le chiffre qui résume le panier*/
calculBasket();
function calculBasket() {
    /*si basketItem est present dans le session storage*/
    if(sessionStorage.getItem("basketItem")) {
        let maxBasketItem = JSON.parse(sessionStorage.getItem("basketItem")).length;
        let basketSelect = document.getElementById("basket");
        basketSelect.innerText = "( " + maxBasketItem + " )";
    /*sinon, crée basketItem et tu dit 0 dans le panier */
    }else {
        sessionStorage.setItem("basketItem", JSON.stringify([]));
        let basketSelect = document.getElementById("basket");
        basketSelect.innerText = "( 0 )";
}}