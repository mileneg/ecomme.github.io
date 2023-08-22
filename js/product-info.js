document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("profile").innerHTML = localStorage.getItem("logeado");
});