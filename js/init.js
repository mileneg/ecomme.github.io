const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
};

//Funcion para agregar los botones en el nav

document.addEventListener("DOMContentLoaded", ()=>{
  let list = document.getElementById("navbarNav").getElementsByClassName("nav-item");

  list[list.length-1].innerHTML = `
    <div class="dropdown">
      <a class="btn btn-secondary dropdown-toggle" href="my-profile.html" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        ${localStorage.getItem("logged")}
      </a>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
        <li><button class="dropdown-item" onclick="changeColor()">Cambiar Modo</button></li>
        <li><a class="dropdown-item" href="login.html" onclick="unlog()">Cerrar sesión</a></li>
      </ul>
    </div>`;
    setTimeout(colorPag,150);
});

//Funcion para cambiar la pagina entre modo claro-oscuro
function changeColor(){
    let page = document.body;
    let divs = document.getElementsByTagName("div");
    let lis = document.getElementsByTagName("li");
    page.classList.toggle("dark");
    //Cambia el color de cada div
    for(let i=0;i<divs.length;i++){
      divs[i].classList.toggle("dark");
    }
    //Cambia el color de cada li
    for(let i=0;i<lis.length;i++){
      lis[i].classList.toggle("dark");
    }

    //Guarda en el localstorage si el modo oscuro esta activo o no
    if(document.body.classList.contains("dark")){
        localStorage.setItem('dark-mode','true');
    } else {
        localStorage.setItem('dark-mode','false');
    };
};

// Funcion que cambia el color de la pagina segun lo guardado de tu sesion anterior
function colorPag(){
  //Verifica en el localstorage si el modo oscuro estaba activo o no
if(localStorage.getItem("dark-mode") === "true"){
    document.body.classList.add("dark")
    let divs = document.getElementsByTagName("div")
    let lis = document.getElementsByTagName("li")
    for(let i=0;i<divs.length;i++){
      divs[i].classList.add("dark");
    }
    for(let i=0;i<lis.length;i++){
      lis[i].classList.add("dark");
    }
} else {
    document.body.classList.remove("dark")
    let divs = document.getElementsByTagName("div")
    let lis = document.getElementsByTagName("li")
    for(let i=0;i<divs.length;i++){
      divs[i].classList.remove("dark");
    }
    for(let i=0;i<lis.length;i++){
      lis[i].classList.remove("dark");
    }
}};

// Funcion para cerrar sesion
function unlog(){
  localStorage.removeItem("logged");
};