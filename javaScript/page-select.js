new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState ==4 && this.status ==200){
            var teddy = JSON.parse(this.responseText);
            resolve(teddy);
        }else if (this.readyState ==4 && this.status != 200){
            reject("le site est actuellement indisponible");
        }
    }
    xhr.open("GET", "http://localhost:3000/api/teddies");
    xhr.send();

}).then (function(teddy){
    var pageSelection = sessionStorage.getItem('pageSelection');

    /*image*/
    let imgItem = document.getElementById('image');
    imgItem.setAttribute("src", teddy[pageSelection]['imageUrl']);
    imgItem.setAttribute("alt", "photo de " + teddy[pageSelection]['name']);

    /*titre*/
    let title = document.getElementById("title");
    title.innerHTML = "<h1>" + teddy[pageSelection]["name"] + "</h1>";

    /*description*/
    let description = document.getElementById("description");
    description.innerHTML = teddy[pageSelection]["description"];

    /*choix des couleurs */
    document.getElementById('textColor').innerHTML='choix de la couleur : ';
    document.getElementById('color').style.display = 'block';
    for( let countColors = teddy[pageSelection]["colors"].length-1 ; countColors >= 0; countColors --) {
         let ensembleChoice = document.getElementById('color');
         let newColor = document.createElement ('option');
         newColor.setAttribute ("value", teddy[pageSelection]["colors"][countColors]);
         newColor.innerHTML = teddy[pageSelection]["colors"][countColors];
         ensembleChoice.prepend(newColor);
    }
    document.getElementById('color').value = teddy[pageSelection]["colors"][0];
    
    /*prix*/
    let price = document.getElementById('price');
    teddyPrice = teddy[pageSelection]["price"]/100;
    price.innerHTML ="<h2>" + teddyPrice.toFixed(2) + " €</h2>";

    /*bouton qui met dans le panier*/
    var btn = document.querySelector('input');
    btn.style.display ="block";
    let count = 0;
    btn.addEventListener('click', addItemBasket);
    
    function addItemBasket() {
        if( sessionStorage.getItem("basketItem" + count)) {
            count ++;
            addItemBasket();
        }else {
        sessionStorage.setItem ("basketItem" + count, pageSelection);
        document.location.href ="index.html";
    }}
    
}).catch (function(error){
    let blocError = document.getElementById('errorMsg');
    blocError.innerHTML = error;
    console.log(error);
})