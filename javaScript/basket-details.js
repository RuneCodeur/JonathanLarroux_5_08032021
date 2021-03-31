let arrayJSON= [];
let noButton= document.getElementById('noButton');
let ValueFirstName= document.getElementById('firstName');
let valueLastName= document.getElementById('lastName');
let valueAdress= document.getElementById('adress');
let valueCityName= document.getElementById('city');
let valueMail= document.getElementById('mail');
let finalButton = document.getElementById('finalButton');

new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState ==4 && this.status ===200){
            var teddy = JSON.parse(this.responseText);
            resolve(teddy);
        }else if (this.readyState ==4 && this.status != 200){
            reject("le site est actuellement indisponible");
        }
    }
    xhr.open("GET", "http://localhost:3000/api/teddies");
    xhr.send();

}).then (function(teddy){
    document.getElementById('myBasket').style.display = 'block';
    let listBasket = document.getElementById('listbasket');
    let basketItem = JSON.parse(sessionStorage.getItem("basketItem")).reverse();
    let countmax = 0;
    startPrice = 0;
    

    /*calcul du panier */
    for(let item of basketItem ){
        arrayJSON.push (teddy[item]['_id']);

        
        /*calcul du prix de chaque elements*/
        let newItemPrice = document.createElement('div');
        let teddyPrice = teddy[item]["price"]/100;
        newItemPrice.classList.add ('col-4');
        newItemPrice.classList.add ('border');
        newItemPrice.classList.add('col-sm-3');
        newItemPrice.classList.add('py-1');
        startPrice += teddyPrice;
        newItemPrice.innerHTML = teddyPrice.toFixed(2) + ' €';
        listBasket.prepend(newItemPrice);

        /*calcul du nom de chaque elements*/
        let newItemName = document.createElement('div');
        newItemName.classList.add ('col-5');
        newItemName.classList.add ('border');
        newItemName.innerHTML = teddy[item]['name'];
        listBasket.prepend(newItemName);

        /*bouton supprimer*/
        let newbuttonSup = document. createElement('div');
        newbuttonSup.classList.add ("col-2");
        newbuttonSup.classList.add ("col-sm-3");
        newbuttonSup.classList.add ("text-right");
        newbuttonSup.innerHTML='<input class="btn btn-danger buttonSup py-0" type="button" id="buttonX" value="X">';
        listBasket.prepend(newbuttonSup);
            
        let buttonX = document.getElementById('buttonX');
        buttonX.onclick = supBasket;
        let countsup = countmax;
        countmax ++;
        function supBasket() {
            basketItem.splice(countsup, 1);
            basketItem.reverse()
            sessionStorage.setItem("basketItem", JSON.stringify(basketItem));
           document.location.href ="panier.html";
        }
        /*calcul du prix total*/
        let totalPrice = document.getElementById ('total-price');
        totalPrice.innerHTML = startPrice.toFixed(2) + ' €';
    }

    /*bouton finaliser ma commande*/
    buttonTransition = document.getElementById('button-transition');
    buttonTransition.onclick = changeStage;

    function changeStage(){
        let buttonSup = document.getElementsByClassName('buttonSup');
        document.getElementById('button-transition').style.display = 'none';
        document.getElementById('fieldset').style.display ='block';
        sessionStorage.setItem("totalPrice", startPrice.toFixed(2) + ' €');
        for(var count=0; count < buttonSup.length; count++) {
                buttonSup[count].style.display='none';
            }

/*bouton confirmer */
new Promise(function(resolve){
    finalButton.addEventListener('click',function(event) {
    event.preventDefault()
        resolve();
})}).then(function(){
    new Promise(function(resolve, reject){
    var sendForm = new XMLHttpRequest();
    sendForm.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 201){
            var responseServer = JSON.parse(this.responseText);
            resolve(responseServer);
        }else if (this.readyState == 4 && this.status != 201){
            reject("le site est actuellement indisponible");
        }
    }
    sendForm.open("POST", "http://localhost:3000/api/teddies/order");
    sendForm.setRequestHeader('Content-Type', 'application/json');
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

}).then (function(responseServer){
    sessionStorage.setItem("orderId", responseServer['orderId'])
    sessionStorage.removeItem('basketItem')
    document.location.href ="confirmation.html";
}).catch (function(error){
    let blocError = document.getElementById('errorMsg');
    blocError.innerHTML = error;
    console.log(error);})

})}}).catch (function(error){
    let blocError = document.getElementById('errorMsg');
    blocError.innerHTML = error;
    console.log(error);})

/*fait apparaitre le bouton de validation du formulaire*/
function buttonValidation(){
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName'); 
    let adress = document.getElementById('adress');
    let city = document.getElementById('city'); 
    let mail = document.getElementById('mail'); 
    if((firstName.validity.valid == true) && (lastName.validity.valid == true) && (adress.validity.valid == true) && (city.validity.valid == true) && (mail.validity.valid == true)){
    noButton.style.display ='none';
    let msgNoComplete = document.getElementById('msgNoComplete');
    msgNoComplete.innerText ='';

    }else{
    noButton.style.display ='block';
    let msgNoComplete = document.getElementById('msgNoComplete');
    msgNoComplete.innerText ='';
}}

noButton.addEventListener('click',function() {
    let msgNoComplete = document.getElementById('msgNoComplete');
    msgNoComplete.innerText ='veuillez correctement remplire le formulaire';
})