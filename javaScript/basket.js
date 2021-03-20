let count = 0;
let basketSelect = document.getElementById('basket');
calculBasket();

function calculBasket() {
    if (sessionStorage.getItem('basketItem' + count)) {
    count ++;
    calculBasket();
    basketSelect.innerText = '( '+ count + ' )';
    }else {
    basketSelect.innerText ='( 0 )';
}}