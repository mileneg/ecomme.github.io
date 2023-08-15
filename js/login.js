document.getElementById("login-button").addEventListener("click", function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var messageElement = document.getElementById("login-message");

    if (username === "usuario" && password === "contraseña") {
      messageElement.textContent = "Inicio de sesión exitoso.";
    } else {
      messageElement.textContent = "Credenciales incorrectas. Por favor, inténtalo de nuevo.";
    }
  });