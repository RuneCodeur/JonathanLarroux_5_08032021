var pageSelection = sessionStorage.getItem('pageSelection');

var request = new XMLHttpRequest();
request.onreadystatechange = function() { 
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { 
        var teddy = JSON.parse(this.responseText);

        /*image*/
        let imgItem = document.getElementById('image');
        imgItem.setAttribute("src", teddy[pageSelection]['imageUrl']);
        imgItem.setAttribute("alt", "photo de " + teddy[pageSelection]['name']);

        /*titre*/
        let title = document.getElementById("title");
        title.innerHTML = "<h1>" + teddy[pageSelection]["name"] + "</h1>" ;

        /*description*/
        let description = document.getElementById("description");
        description.innerHTML = teddy[pageSelection]["description"] ;

        /*choix des couleurs */
        for( let countColors = teddy[pageSelection]["colors"].length-1 ; countColors >= 0; countColors --){
             let ensembleChoice = document.getElementById('color');
             let newColor = document.createElement ('option');
             newColor.setAttribute ("value", teddy[pageSelection]["colors"][countColors]);
             newColor.innerHTML = teddy[pageSelection]["colors"][countColors];
             ensembleChoice.prepend(newColor);
        }
        document.getElementById('color').value = teddy[pageSelection]["colors"][0];

        /*prix*/
        let price = document.getElementById('price');
        teddyPrice = teddy[pageSelection]["price"]/100;
        price.innerHTML ="<h2>" + teddyPrice.toFixed(2) + " €</h2>";

        /*bouton*/
        var btn = document.querySelector('input');
        btn.addEventListener('click', addItem);
        btn.addEventListener('click', addItemBasket);

        function addItem(){
            if(sessionStorage.getItem(pageSelection)){
                let actualBasketCompil = sessionStorage.getItem(pageSelection);
                actualBasketCompil ++;
                sessionStorage.setItem (pageSelection, actualBasketCompil);
                document.location.href ="index.html";
            }else{
            sessionStorage.setItem(pageSelection, "1");
            }
        }

        function addItemBasket(){
            if(sessionStorage.getItem("basketNumber")){
                let actualBasketNumber = sessionStorage.getItem("basketNumber");
                actualBasketNumber ++;
                sessionStorage.setItem ("basketNumber", actualBasketNumber);
                document.location.href ="index.html";
            }else{
            sessionStorage.setItem("basketNumber", "1");
            document.location.href ="index.html";
            }
        }
            
}};
    
request.open("GET", "http://localhost:3000/api/teddies");
request.send();