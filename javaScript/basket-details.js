let basketItem = JSON.parse(sessionStorage.getItem("basketItem")).reverse();
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
    /*fait apparaitre l'interface du panier*/
    document.getElementById("myBasket").style.display = "block";
    /*pour chaque teddy dans le panier */
    for(let teddy of basketItem) {
        /*met chaque élément du panier dans un array(pour la finalisation de la commande)*/
        arrayJSON.push(teddy["_id"]);

        /*crée le bloc et calcul du prix de chaque élément*/
        let newItemPrice = document.createElement("div");
        let teddyPrice = teddy["price"]/100;
        newItemPrice.classList.add("col-4");
        newItemPrice.classList.add("border");
        newItemPrice.classList.add("col-sm-3");
        newItemPrice.classList.add("py-1");
        newItemPrice.innerHTML = teddyPrice.toFixed(2) + " €";
        listBasket.prepend(newItemPrice);
        startPrice += teddyPrice;

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

/*si aucun item est présent dans le panier*/
}}else {
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

/******partie finaliser ma commande******/
/*annule le comportement de base du bouton confirmer */
finalButton.addEventListener("click",function(event) {
    event.preventDefault();
})
/*calcul la validité de chaque élément du formulaire*/
function buttonValidation() {
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName"); 
    let adress = document.getElementById("adress");
    let city = document.getElementById("city"); 
    let mail = document.getElementById("mail"); 
    let msgNoComplete = document.getElementById("msgNoComplete");
    /*si tout les éléments du formulaire sont valide, le bouton peux envoyer les infos*/
    if((firstName.validity.valid == true) && (lastName.validity.valid == true) && (adress.validity.valid == true) && (city.validity.valid == true) && (mail.validity.valid == true)) {
        finalButton.setAttribute ('onclick', 'sendConfirm()');
        msgNoComplete.innerText = '';
    
    /*sinon, le bouton n'envoie pas les infos*/
    }else {
        finalButton.setAttribute ('onclick', 'sendNotConfirm()');
        msgNoComplete.innerText = '';
}}

/*si tu essaie de valider un formulaire non valide, tu signale au client*/
function sendNotConfirm() {
    let msgNoComplete = document.getElementById("msgNoComplete");
    msgNoComplete.innerText = "veuillez correctement remplire le formulaire";
}

/*envoie les informations d'achat */
function sendConfirm(){
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
})}