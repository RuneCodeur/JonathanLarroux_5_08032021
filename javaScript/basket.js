let count = 0;
let basketSelect = document.getElementById('basket');
calculBasket();
basketSelect.innerText = '( '+ count + ' )';

function calculBasket() {
    if (sessionStorage.getItem('basketItem' + count)) {
    count ++;
    calculBasket();
}}