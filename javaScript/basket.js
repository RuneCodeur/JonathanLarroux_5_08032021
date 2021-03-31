calculBasket();

function calculBasket(){
    if (sessionStorage.getItem("basketItem")){
        let maxBasketItem = JSON.parse(sessionStorage.getItem("basketItem")).length;
        let basketSelect = document.getElementById('basket');
        basketSelect.innerText = '( '+ maxBasketItem + ' )';
    }else{
        sessionStorage.setItem ("basketItem", JSON.stringify([]));
        let basketSelect = document.getElementById('basket');
        basketSelect.innerText = '( 0 )';
}}