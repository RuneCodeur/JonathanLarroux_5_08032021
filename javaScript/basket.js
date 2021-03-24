let basket = new Promise((resolve) =>{
    let count = 0;
    promiseBasket();
    
    function promiseBasket(){
        if (sessionStorage.getItem('basketItem' + count)) {
            count ++;
            promiseBasket();
    }}
    resolve(count);
});

basket.then((value)=> {
    let basketSelect = document.getElementById('basket');
    basketSelect.innerText = '( '+ value + ' )';
});