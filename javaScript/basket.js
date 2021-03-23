let count = 0;
let basketSelect = document.getElementById('basket');
basketSelect.innerText = '( '+ calculBasket() + ' )';

function calculBasket() {
    if (sessionStorage.getItem('basketItem' + count)) {
    count ++;
    calculBasket();
    return count;
}else {
    return 0;
}}