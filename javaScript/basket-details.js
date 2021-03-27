
let arrayJSON= [];
let firstNameValidate= false;
let lastNameValidate= false;
let adressValidate= false;
let cityNameValidate= false;
let mailNameValidate= false;
let ValueFirstName= document.getElementById('firstName');
let valueLastName= document.getElementById('lastName');
let valueAdress= document.getElementById('adress');
let valueCityName= document.getElementById('city');
let valueMail= document.getElementById('mail');
let finalButton = document.getElementById('finalButton');

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var teddy = JSON.parse(this.responseText);
        let listBasket = document.getElementById('listbasket');
        let countItem = 0;
        startPrice = 0;
        calculBasket();
        let count = countItem - 1;
        calculItem();

        /* calcul du nombre max du panier*/
        function calculBasket() {
            if (sessionStorage.getItem('basketItem' + countItem)) {
            countItem ++;
            calculBasket();
        }}
        /*calcul du panier */
        function calculItem() {
            if(sessionStorage.getItem('basketItem' + count), count > -1) {
                itemSelect = sessionStorage.getItem('basketItem' + count);
                arrayJSON.push (teddy[itemSelect]['_id']);
                
                /*calcul du prix de chaque elements*/
                let newItemPrice = document.createElement('div');
                let teddyPrice = teddy[itemSelect]["price"]/100;
                newItemPrice.classList.add ('col-4');
                newItemPrice.classList.add ('border');
                newItemPrice.classList.add('col-sm-3');
                startPrice += teddyPrice;
                newItemPrice.innerHTML = teddyPrice.toFixed(2) + ' €';
                listBasket.prepend(newItemPrice);

                /*calcul du nom de chaque elements*/
                let newItemName = document.createElement('div');
                newItemName.classList.add ('col-5');
                newItemName.classList.add ('border');
                newItemName.innerHTML = teddy[itemSelect]['name'];
                listBasket.prepend(newItemName);

                /*calcul du prix total*/
                let totalPrice = document.getElementById ('total-price');
                totalPrice.innerHTML = startPrice.toFixed(2) + ' €';
                count --;
                calculItem();
        }}}

        /*bouton finaliser ma commande*/
        buttonTransition = document.getElementById('button-transition');
        buttonTransition.onclick = changeStage;

        function changeStage(){
            document.getElementById('button-transition').style.display = 'none';
            document.getElementById('fieldset').style.display ='block';
            sessionStorage.setItem("totalPrice", startPrice);
        }

        /*envoie les données au click du bouton de validation du formulaire*/
        function sendForm() {
            var request = new XMLHttpRequest(); /*déclare la requete */
            request.onload = function () {/*fait un truc avec le chargement de la requete */
                if (request.readyState == request.DONE && request.status == 201) { /*si la requete est terminé et que la requete serveur affiche 200 */
                    document.location.href ="confirmation.html";
            }};
            request.open('POST', 'http://localhost:3000/api/teddies/order');/*ouvvre la requete */
            request.setRequestHeader('Content-Type', 'application/json'); /*balance les infos de base au serveur */
            let json = {contact: {firstName: ValueFirstName, lastName: valueLastName, address: valueAdress, city: valueCityName, email: valueMail}, products: arrayJSON};/* déclare les données à envoyer */
            request.send(JSON.stringify(json)); /*balance la sauce*/       
        }

        finalButton.addEventListener('click', (event) => {
        sendForm();
        event.preventDefault();/*bloque le comportement par défaut du request (ouvrir le fichier request) */
})} 
request.open("GET", "http://localhost:3000/api/teddies");
request.send();

/*analyse la validité de chaque element du formulaire*/
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