let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
let total = 0;
let cost = 0;
let typeShipping = "";
let paymentMethods = "";

/* showCart muestra tabla y productos agregados al carrito */
function showCart(record){
    let htmlContentToAppend=`<tr>
    <th></th>
    <th>Nombre</th>
    <th>Costo</th>
    <th>Cantidad</th>
    <th>Subtotal</th>
  </tr>`;
    for (const product of record) { 
        htmlContentToAppend += `
        <tr>
            <td><img  style="width:15rem" id="imgCarrito" src="${product.image}" class="img-thumbnail img-fluid"> </img></td>
            <td>${product.name}</td>
            <td>${product.currency} ${product.unitCost}</td>
            <td><input type="number" style="height: 30px;width: 40px;" product-id="${product.id}" onchange="updatePrice(this)" value="${product.count}" min="1" onkeydown="return false"></td>
            <td>${product.currency} ${product.unitCost * product.count}</td>
            <td><button type="button" class="btn btn-outline-danger" id="${product.name}" onclick="deleteProduct(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg></button></td>
        </tr>
        `}
    document.getElementById("tabla").innerHTML = htmlContentToAppend;
    subtotals();
    if (typeShipping !== ""){ 
        calculateShipping();
    }
    calculateTotal();
}
   
/* updatePrice actualiza precio */
function updatePrice(input){
    const productId = input.getAttribute("product-id");
    const product = cart.find(item => item.id == productId);

    if (product) {
            product.count = input.value;
        }
        sessionStorage.setItem("cart", JSON.stringify(cart));
        showCart(cart);
    }
     
document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(CART_INFO_URL+25801+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            const objet = cart.findIndex((product) => product.id == resultObj.data.articles[0].id)
            if(objet == -1){
            cart.push(resultObj.data.articles[0]);
            showCart(cart)
        }else {showCart(cart)}
    }
    });
});

// Funcion que devuelve la suma de los precios de todos los productos en dolares
function subtotals(){
    let temporary = 0;
    for( let article of cart){
        if (article.currency == "UYU"){
            temporary += article.count * (article.unitCost/40);
        }else{
            temporary += article.count * article.unitCost;
        }
    }
    total = temporary;
    document.getElementById("subtotal").innerHTML = "USD " + total;
}

//Funcion asosciada a los topos de envio
function shipment(input){
    typeShipping = input;
    calculateShipping();
}
 
//Función que calcula precio de envío según tipo de envío elegido
function calculateShipping(){
    let id = typeShipping.getAttribute("id");
    switch (id){
        case "premium": cost = total * 0.15;
        break;
        case "express": cost = total * 0.07;
        break
        case "standard": cost = total * 0.05;
    } 
    document.getElementById("envío").innerHTML = "USD " + Math.round(cost);
    calculateTotal()
}
//Funcion para clacular total a pagar
function calculateTotal(){
    let price = total +  Math.round(cost);
    document.getElementById("total").innerHTML= "USD " + price;
}

//Funcion para seleccionar método de pago
function paymentMethod(input){
   paymentMethods = input.getAttribute("id");
    if(paymentMethods == "crédito"){
        document.getElementById("numero_cuenta").setAttribute("disabled", "");
        document.getElementById("vencimiento_tarjeta").removeAttribute("disabled");
        document.getElementById("codigo_tarjeta").removeAttribute("disabled");
        document.getElementById("num_tarjeta").removeAttribute("disabled");
        document.getElementById("formaDePago").innerText = "Tarjeta de crédito";
    }else{ 
        document.getElementById("numero_cuenta").removeAttribute("disabled");
        document.getElementById("vencimiento_tarjeta").setAttribute("disabled", "");
        document.getElementById("codigo_tarjeta").setAttribute("disabled", "");
        document.getElementById("num_tarjeta").setAttribute("disabled", "");
        document.getElementById("formaDePago").innerText = "Transferencia bancaria";
    }
}

document.getElementById("comprar").addEventListener("click",()=>{
    const street = document.getElementById("calle");
    const num = document.getElementById("numero");
    const corner = document.getElementById("esquina");
    const shipping = document.getElementsByName("shipping");
    const btn = document.getElementById("link");
    const finish = document.getElementsByClassName("is-invalid")

    event.preventDefault();

    if (street.value == ""){
        street.classList.add("is-invalid")
    }else{
        street.classList.remove("is-invalid")
    }
    
    if (num.value == ""){
        num.classList.add("is-invalid")
    }else{
        num.classList.remove("is-invalid")
    }

    if (corner.value == ""){
        corner.classList.add("is-invalid")
    }else{
        corner.classList.remove("is-invalid")
    }

    if (typeShipping == ""){
        for (let shipment of shipping){
            shipment.classList.add("is-invalid")
        }
    }else{
        for (let shipment of shipping){
            shipment.classList.remove("is-invalid")
        }
    }

    if (paymentMethods == ""){
        btn.classList.add("is-invalid")
    }else{
        btn.classList.remove("is-invalid")
    }

    if (paymentMethods == "transferencia"){
        let account = document.getElementById("numero_cuenta").value;

        if (account == ""){
            btn.classList.add("is-invalid")
        }else{
        btn.classList.remove("is-invalid")
        }
    }

    if (paymentMethods == "crédito"){
        let number = document.getElementById("num_tarjeta").value; 
        let code = document.getElementById("codigo_tarjeta").value;
        let date  = document.getElementById("vencimiento_tarjeta").value;
        
        if(number == "" || code == "" || date == ""){
            btn.classList.add("is-invalid")
        } else{
            btn.classList.remove("is-invalid")
        }
    }
    
    if( finish.length == 0){
        
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada con éxito',
            showConfirmButton: false,
            timer: 1500
          })
    }
})

/* Funcion para borrar un producto del carrito */
function deleteProduct(button){
    let thing = button.getAttribute("id");
    let provisional = [];
    for (let article of cart){
        if (article.name !== thing){
            provisional.push(article);
        }
    }
    cart = provisional;
    sessionStorage.setItem("cart", JSON.stringify(cart));
    showCart(cart);
    calculateShipping();
}