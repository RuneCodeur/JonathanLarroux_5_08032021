var pageSelection = sessionStorage.getItem("pageSelection");

new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var teddy = JSON.parse(this.responseText);
            resolve(teddy);
        }else if(this.readyState == 4 && this.status != 200) {
            reject("le site est actuellement indisponible");
        }
    }
    xhr.open("GET", "http://localhost:3000/api/teddies/" + pageSelection);
    xhr.send();

}).then(function(teddy) {
    /*image*/
    let imgItem = document.getElementById("image");
    imgItem.setAttribute("src", teddy["imageUrl"]);
    imgItem.setAttribute("alt", "photo de " + teddy["name"]);

    /*titre*/
    let title = document.getElementById("title");
    title.innerHTML = "<h1>" + teddy["name"] + "</h1>";

    /*description*/
    let description = document.getElementById("description");
    description.innerText = teddy["description"];

    /*choix des couleurs */
    document.getElementById("textColor").innerHTML = "choix de la couleur : ";
    document.getElementById("color").style.display = "block";
    for(let countColors = teddy["colors"].length-1; countColors >= 0; countColors --) {
         let ensembleChoice = document.getElementById("color");
         let newColor = document.createElement ("option");
         newColor.setAttribute ("value", teddy["colors"][countColors]);
         newColor.innerText = teddy["colors"][countColors];
         ensembleChoice.prepend(newColor);
    }
    document.getElementById("color").value = teddy["colors"][0];
    
    /*prix*/
    let price = document.getElementById("price");
    teddyPrice = teddy["price"]/100;
    price.innerHTML = "<h2>" + teddyPrice.toFixed(2) + " €</h2>";

    /*bouton qui met dans le panier*/
    var btn = document.querySelector("input");
    btn.style.display = "block";
    btn.addEventListener("click", addItemBasket);
    
    function addItemBasket() {
        let basketItem = JSON.parse(sessionStorage.getItem("basketItem"));
        basketItem.push(pageSelection);
        sessionStorage.setItem("basketItem", JSON.stringify(basketItem));
        document.location.href = "index.html";
    }
    
}).catch(function(error) {
    let blocError = document.getElementById("errorMsg");
    blocError.innerText = error;
    console.log(error);
})