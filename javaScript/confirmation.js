let suivi = sessionStorage.getItem("orderId");
let totalPrice = sessionStorage.getItem("totalPrice");
let priceLocation = document.getElementById("price");
let suiviLocation = document.getElementById("orderId");
let confirmation = document.getElementById('confirmation');
let erreur = document.getElementById('erreur');
confirm();

function confirm(){
    if(sessionStorage.getItem("totalPrice") && sessionStorage.getItem("orderId")){
        /*résume le prix */
        confirmation.style.display = "block";
        priceLocation.innerText = totalPrice;

        /*donne le numero de suivi */
        suiviLocation.innerText = suivi;
    }else{
        erreur.innerHTML = "Une erreur est survenue lors de la validation de votre commande. <br> Veuillez contacter le service client.";
}}