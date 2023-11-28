
//Evento para el boton Entrar, que ejecuta las validaciones.

document.getElementById("btn").addEventListener("click", () => {

  var username = document.getElementById("emailinput").value;
  var password = document.getElementById("password").value;

  if (username === ""|| password === "" || validateEmail(username)) {
      alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
  } else {
      localStorage.setItem("logged", document.getElementById("emailinput").value);
      window.location="index.html";   
  }
});

//Funcion para validar que se haya ingresado un mail con su formato adecuado

function validateEmail(email){	
	var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

	if( validEmail.test(email) ){
		return false;
	}else{
		return true;
	}
}