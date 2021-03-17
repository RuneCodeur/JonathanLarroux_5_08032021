
var maxBasket = sessionStorage.length;
var preco = sessionStorage.getItem(sessionStorage.key(1))
let test = document.getElementById ('test');
test.innerText = "elements dans sessionStorage = " + preco;

var request = new XMLHttpRequest();
request.onreadystatechange = function() { 
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { 
        var teddy = JSON.parse(this.responseText);
        for(let count = 0; count >= maxBasket - 3; count ++){
            let itemSelection = sessionStorage.getItem(sessionStorage.key(count));
            let placeSelection = getElementById ('elementContainer');

        
    }}}    
request.open("GET", "http://localhost:3000/api/teddies");
request.send();
