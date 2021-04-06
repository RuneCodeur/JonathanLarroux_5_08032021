let basketItem = JSON.parse(sessionStorage.getItem("basketItem")).reverse();
let noButton = document.getElementById("noButton");
let ValueFirstName = document.getElementById("firstName");
let valueLastName = document.getElementById("lastName");
let valueAdress = document.getElementById("adress");
let valueCityName = document.getElementById("city");
let valueMail = document.getElementById("mail");
let finalButton = document.getElementById("finalButton");
let listBasket = document.getElementById("listbasket");
let arrayJSON = [];
let countmax = 0;
startPrice = 0;

/*calcul du panier*/
if(basketItem.length > 0) {
    /*fait patienter le client durant le calcul du panier*/
    let calcul = document.getElementById("calculMsg");
    calcul.innerText = "Calcul de votre panier en cours...";
    /*pour chaque item dans le panier */
    for(let item of basketItem) {
        setTimeout(function() { 
            /*crée un appel serveur pour chaque item dans le panier*/
            new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status === 200) {
                        var teddy = JSON.parse(this.responseText);
                        resolve(teddy);
                    }else if(this.readyState == 4 && this.status != 200) {
                        reject("Le site est actuellement indisponible");
                }}
                xhr.open("GET", "http://localhost:3000/api/teddies/"+ item);
                xhr.send();

            /*crée les éléments du panier*/
            }).then(function(teddy) {
                document.getElementById("myBasket").style.display = "block";
                calcul.style.display = "none";
                /*met chaque élément du panier dans un array*/
                arrayJSON.push(teddy["_id"]);

                /*crée le bloc et calcul du prix de chaque élément*/
                let newItemPrice = document.createElement("div");
                let teddyPrice = teddy["price"]/100;
                newItemPrice.classList.add("col-4");
                newItemPrice.classList.add("border");
                newItemPrice.classList.add("col-sm-3");
                newItemPrice.classList.add("py-1");
                startPrice += teddyPrice;
                newItemPrice.innerHTML = teddyPrice.toFixed(2) + " €";
                listBasket.prepend(newItemPrice);

                /*crée le bloc et calcul du nom de chaque elements*/
                let newItemName = document.createElement("div");
                newItemName.classList.add("col-5");
                newItemName.classList.add("border");
                newItemName.innerHTML = teddy["name"];
                listBasket.prepend(newItemName);

                /*crée le bouton supprimer*/
                let newbuttonSup = document. createElement("div");
                newbuttonSup.classList.add("col-2");
                newbuttonSup.classList.add("col-sm-3");
                newbuttonSup.classList.add("text-right");
                newbuttonSup.innerHTML = '<input class="btn btn-danger buttonSup py-0" type="button" id="buttonX" value="X">';
                listBasket.prepend(newbuttonSup);
                
                /*crée le comportement du bouton supprimer*/
                let buttonX = document.getElementById("buttonX");
                let countSup = countmax;
                buttonX.onclick = supBasket;
                countmax ++;
                function supBasket() {
                    basketItem.splice(countSup, 1);
                    basketItem.reverse();
                    sessionStorage.setItem("basketItem", JSON.stringify(basketItem));
                    document.location.href ="panier.html";
                }

                /*calcul du prix total*/
                let totalPrice = document.getElementById ("total-price");
                totalPrice.innerText = startPrice.toFixed(2) + " €";

            }).catch(function(error) {
                let blocError = document.getElementById("errorMsg");
                blocError.innerText = error;
/*si aucun item est présent dans le panier*/
})}, 2000)}}else {
        let blocError = document.getElementById("errorMsg");
        blocError.innerText = "Vous n'avez rien mis dans votre panier !";
    }

    /* crée le comportement du bouton finaliser mes achats*/
    buttonTransition = document.getElementById("button-transition");
    buttonTransition.onclick = changeStage;
    function changeStage() {
        let buttonSup = document.getElementsByClassName("buttonSup");
        document.getElementById("button-transition").style.display = "none";
        document.getElementById("fieldset").style.display = "block";
        sessionStorage.setItem("totalPrice", startPrice.toFixed(2) + " €");
        for(var count = 0; count < buttonSup.length; count++) {
                buttonSup[count].style.display = "none";
    }}

/*partie finaliser ma commande*/

/*calcul la validité de chaque élément du formulaire*/
function buttonValidation() {
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName"); 
    let adress = document.getElementById("adress");
    let city = document.getElementById("city"); 
    let mail = document.getElementById("mail"); 
    /*si tout les éléments du formulaire sont valide, libère le bouton*/
    if((firstName.validity.valid == true) && (lastName.validity.valid == true) && (adress.validity.valid == true) && (city.validity.valid == true) && (mail.validity.valid == true)) {
    noButton.style.display = "none";
    let msgNoComplete = document.getElementById("msgNoComplete");
    msgNoComplete.innerText = '';
    
    /*sinon, tu bloque le bouton*/
    }else {
    noButton.style.display = "block";
    let msgNoComplete = document.getElementById("msgNoComplete");
    msgNoComplete.innerText = '';
}}

/*si tu essaie de valider un formulaire non valide, tu signale au client*/
noButton.addEventListener("click",function() {
    let msgNoComplete = document.getElementById("msgNoComplete");
    msgNoComplete.innerText = "veuillez correctement remplire le formulaire";
})

/*bouton confirmer mon achat */
new Promise(function(resolve){
    finalButton.addEventListener("click",function(event) {
    event.preventDefault();
        resolve();
})}).then(function() {
    /*envoie les informations d'achat */
    new Promise(function(resolve, reject) {
    var sendForm = new XMLHttpRequest();
    sendForm.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 201) {
            var responseServer = JSON.parse(this.responseText);
            resolve(responseServer);
        }else if(this.readyState == 4 && this.status != 201) {
            reject("le site est actuellement indisponible");
        }
    }
    sendForm.open("POST", "http://localhost:3000/api/teddies/order");
    sendForm.setRequestHeader("Content-Type", "application/json");
    let json = {
        contact: {
            firstName: ValueFirstName.value,
            lastName: valueLastName.value, 
            address: valueAdress.value, 
            city: valueCityName.value, 
            email: valueMail.value
        },
        products: arrayJSON
    };
    sendForm.send(JSON.stringify(json));

/*envoie dans le session storage les infos utilisé pour la page confirmation*/
}).then(function(responseServer) {
    sessionStorage.setItem("orderId", responseServer["orderId"])
    sessionStorage.removeItem("basketItem")
    document.location.href = "confirmation.html";
}).catch(function(error) {
    let blocError = document.getElementById("errorMsg");
    blocError.innerText = error;
})})