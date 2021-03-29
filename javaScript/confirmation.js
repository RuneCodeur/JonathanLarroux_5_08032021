/*résume le prix */
let totalPrice = sessionStorage.getItem('totalPrice');
let priceLocation = document.getElementById('price');
priceLocation.innerText = totalPrice;

/*donne le numero de suivi */
let suivi = sessionStorage.getItem('orderId');
let suiviLocation = document.getElementById('orderId');
suiviLocation.innerText = suivi;