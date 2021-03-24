/* calcul du nombre max du panier*/
let countItem = 0;
basket.then((value)=> {
    countItem = value;
});

let myJSON = [];

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var teddy = JSON.parse(this.responseText);

        /*calcul des elements du panier*/
        let count = countItem - 1;
        startPrice = 0;
        let listBasket = document.getElementById('listbasket');
        calculItem();

        function calculItem() {
            if(sessionStorage.getItem('basketItem' + count), count > -1) {
                itemSelect = sessionStorage.getItem('basketItem' + count);

                myJSON.push (teddy[itemSelect]['_id']);
                
                /*calcul du prix de chaque elements*/
                let newItemPrice = document.createElement('div');
                newItemPrice.classList.add ('col-4');
                newItemPrice.classList.add ('border');
                newItemPrice.classList.add('col-sm-3');
                let teddyPrice = teddy[itemSelect]["price"]/100;
                let finalPrice = new Promise((resolve) => {
                    startPrice += teddyPrice;
                    resolve(startPrice);
                });
                newItemPrice.innerHTML = teddyPrice.toFixed(2) + ' €';
                listBasket.prepend(newItemPrice);

                /*calcul du nom de chaque elements*/
                let newItemName = document.createElement('div');
                newItemName.classList.add ('col-5');
                newItemName.classList.add ('border');
                newItemName.innerHTML = teddy[itemSelect]['name'];
                listBasket.prepend(newItemName);

                /*calcul du prix total*/
                finalPrice.then((value)=>{
                    let totalPrice = document.getElementById ('total-price');
                    totalPrice.innerHTML = value.toFixed(2) + ' €';
                });
                count --;
                calculItem();
}}}} 
request.open("GET", "http://localhost:3000/api/teddies");
request.send();

/*bouton finaliser ma commande*/
function changeStage(){
    document.getElementById('button-transition').style.display = 'none';
    document.getElementById('fieldset').style.display ='block';
}

buttonTransition = document.getElementById('button-transition');
buttonTransition.onclick = changeStage;

/*analyse la validité de chaque element du formulaire*/
let firstNameValidate= false;
let lastNameValidate= false;
let adressValidate= false;
let cityNameValidate= false;
let mailNameValidate= false;
let finalButton = document.getElementById('finalButton');

function verificationFirstName(){
    let firstName = document.getElementById('firstName'); 
    if (firstName.validity.valid == false){
        firstNameValidate = false;
        buttonValidation();
    }else{
       firstNameValidate = true;
       buttonValidation();
}}

function verificationlastName(){
    let lastName = document.getElementById('lastName'); 
    if (lastName.validity.valid == false){
        lastNameValidate= false;
        buttonValidation();
    }else{
        lastNameValidate= true;
        buttonValidation();
}}

function verificationAdress(){
    let adress = document.getElementById('adress'); 
    if (adress.validity.valid == false){
        adressValidate= false;
        buttonValidation();
    }else{
        adressValidate= true;
        buttonValidation();
}}

function verificationCity(){
    let city = document.getElementById('city'); 
    if (city.validity.valid == false){
        cityNameValidate= false;
        buttonValidation();
    }else{
        cityNameValidate= true;
        buttonValidation();
}}

function verificationMail(){
    let mail = document.getElementById('mail'); 
    if (mail.validity.valid == false){
        mailNameValidate= false;
        buttonValidation();
    }else{
        mailNameValidate= true;
        buttonValidation();
}}

/*fait apparaitre le bouton de validation du formulaire*/
function buttonValidation(){
    if((firstNameValidate == true) && (lastNameValidate == true) && (adressValidate == true) && (cityNameValidate == true) && (mailNameValidate == true)){ 
    finalButton.disabled = false;
    }else{
        finalButton.disabled = true;
}}

/*envoie les données au click du bouton de validation du formulaire*/
finalButton.addEventListener('click', sendData);

function sendData(){
    var variable = new XMLHttpRequest(); 
    request.open("POST", "http://localhost:3000/api/teddies"); 
    request.setRequestHeader("Content-Type", "application/json"); 
    request.send(JSON.stringify(myJSON));
    document.location.href ="confirmation.html";
}