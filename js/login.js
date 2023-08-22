document.getElementById("btn").addEventListener("click", function(event) {
    event.preventDefault();
    var username = document.getElementById("emailinput").value;
    var password = document.getElementById("password").value;

    if (username === ""  || password === "") {
      alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    } else {
      localStorage.setItem("logeado",document.getElementById("emailinput").value);
      location.replace("index.html");
    }
  });