new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status === 200) {
            var teddy = JSON.parse(this.responseText);
            resolve(teddy);
        }else if(this.readyState == 4 && this.status != 200) {
            reject("le site est actuellement indisponible");
        }
    }
    xhr.open("GET", "http://localhost:3000/api/teddies");
    xhr.send();

    /*pour chaque item présent dans la liste */
}).then(function(teddy) {
    for(let count = teddy.length-1; count >= 0; count --) {

        /*crée une carte */
        let cardItem = document.getElementById("cardItem");
        let newCard = document.createElement ("div");
        let teddyPrice = teddy[count]["price"]/100;
        newCard.classList.add("card");
        newCard.classList.add("m-4");

        /*envoie l'ID de l'item selectionné dans le session storage */
        function select() {
            sessionStorage.setItem("pageSelection", teddy[count]["_id"]);
        }
        newCard.onclick = select;

        /*met toutes les infos en forme dans une carte*/
        newCard.innerHTML ='<a href="produit.html" class="select"><img class="card-img-top" src="' + teddy[count]["imageUrl"] + '" alt="image de ' + teddy[count]["name"] + ' width="100"><div class="card-body"><div class="card-title"><h2 class="text-center">' + teddy[count]["name"] + '</h2></div><div class="card-text text-center">' + teddyPrice.toFixed(2) + '€</div></div></a>';
        cardItem.prepend(newCard);
    }
}).catch(function(error){
    let blocError = document.getElementById('errorMsg');
    blocError.innerText = error;
    console.log(error);
})