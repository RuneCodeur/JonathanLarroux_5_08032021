/*si pageSelection est présent dans le session storage*/
if (sessionStorage.getItem("pageSelection")) {
    var pageSelection = sessionStorage.getItem("pageSelection");

    new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var teddy = JSON.parse(this.responseText);
                resolve(teddy);
            } else if (this.readyState == 4 && this.status != 200) {
                reject("le site est actuellement indisponible");
            }
        }
        xhr.open("GET", "http://localhost:3000/api/teddies/" + pageSelection);
        xhr.send();

    /*si l'Id est récupréré*/
    }).then(function(teddy) {
        /* calcul de l'image*/
        let imgItem = document.getElementById("image");
        imgItem.setAttribute("src", teddy["imageUrl"]);
        imgItem.setAttribute("alt", "photo de " + teddy["name"]);

        /*calcul du titre*/
        let title = document.getElementById("title");
        title.innerHTML = "<h1>" + teddy["name"] + "</h1>";

        /*calcul de la description*/
        let description = document.getElementById("description");
        description.innerText = teddy["description"];

        /*calcul du choix des couleurs */
        document.getElementById("textColor").innerHTML = "choix de la couleur : ";
        document.getElementById("color").style.display = "block";
        for (let countColors = teddy["colors"].length-1; countColors >= 0; countColors --) {
            let ensembleChoice = document.getElementById("color");
            let newColor = document.createElement ("option");
            newColor.setAttribute ("value", teddy["colors"][countColors]);
            newColor.innerText = teddy["colors"][countColors];
            ensembleChoice.prepend(newColor);
        }
        document.getElementById("color").value = teddy["colors"][0];
        
        /* calcul du prix*/
        let price = document.getElementById("price");
        teddyPrice = teddy["price"]/100;
        price.innerHTML = "<h2>" + teddyPrice.toFixed(2) + " €</h2>";

        /*calcul du bouton ajouter*/
        var btn = document.querySelector("input");
        btn.style.display = "block";
        btn.addEventListener("click", addItemBasket);
        
        /*calcul du comportement du bouton ajouter*/
        function addItemBasket() {
            let basketItem = JSON.parse(sessionStorage.getItem("basketItem"));
            let infoItem = {_id:teddy["_id"], name:teddy["name"], price: teddy["price"]}
            basketItem.push(infoItem);
            sessionStorage.setItem("basketItem", JSON.stringify(basketItem));
            document.location.href = "index.html";
        }
    }).catch(function(error) {
        let blocError = document.getElementById("errorMsg");
        blocError.innerText = error;

/*si pageSelection n'est pas présent dans le session storage*/
})} else {
    let blocError = document.getElementById("errorMsg");
    blocError.innerHTML = 'Veuillez sélectionner un objet sur la page principale<br><a href="index.html">Cliquez ici</a>';
}