var basketNumber = sessionStorage.getItem('basketNumber');
let basketSelect = document.getElementById('basket');
if (basketNumber == null){
    basketSelect.innerText = '(0)';
}else{
basketSelect.innerText ='(' + basketNumber + ')';
}