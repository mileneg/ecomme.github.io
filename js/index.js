document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("autos").addEventListener("click", ()=> {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", ()=> {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", ()=> {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
    if (localStorage.getItem("logged") === null){ //si no estas logeado te redirige a la pagina de login
        location.replace("login.html");   
    }      
});