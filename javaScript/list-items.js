var request = new XMLHttpRequest();
request.onreadystatechange = function() { 
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var teddy = JSON.parse(this.responseText);
        
        for(let count = teddy.length-1; count >= 0; count --){
            let cardItem = document.getElementById('cardItem');
            let newCard = document.createElement ('div');
            newCard.classList.add("card");
            newCard.classList.add("m-4");

            function select(){
                sessionStorage.setItem("pageSelection", count);
            }
            newCard.onclick = select;
            teddyPrice = teddy[count]["price"]/100;

            newCard.innerHTML ='<a href="produit.html" class="select"><img class="card-img-top" src="' + teddy[count]["imageUrl"] + '" alt="image de ' + teddy[count]["name"] + ' width="100"><div class="card-body"><div class="card-title"><h2 class="text-center">' + teddy[count]["name"] + '</h2></div><div class="card-text text-center">' + teddyPrice.toFixed(2) +'€</div></div></a>';
            cardItem.prepend (newCard);
            
}}};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();