const btn = document.getElementById("btn");
const img = document.getElementById('img');
let email = localStorage.getItem("logged");
let picture = document.getElementById("foto_perfil");
let info = JSON.parse(localStorage.getItem(`${email}`)) || [];

/*recopilar info de usuario, guardar en el almacenamiento local al hacer click en el boton*/
btn.addEventListener("click",()=>{
    event.preventDefault();
    let name1 = document.getElementById("nombre");
    let name2 = document.getElementById("segundo_nombre");
    let lastname1 = document.getElementById("primer_apellido");
    let lastname2 = document.getElementById("segundo_apellido");
    let phone = document.getElementById("telefono");
   
    if (name1.value !== ""){
        name1.classList.remove("is-invalid")
    }else{
        name1.classList.add("is-invalid")
    }

    if( lastname1.value !== ""){
        lastname1.classList.remove("is-invalid")
    }else{
        lastname1.classList.add("is-invalid")
    }

    if (name1.value !== "" && lastname1.value !== ""){
        info = {
            ...info,
            "name1": name1.value,
            "name2": name2.value,
            "lastname1": lastname1.value,
            "lastname2": lastname2.value,
            "phone": phone.value,
        };
        localStorage.setItem(`${email}`, JSON.stringify(info));
    }
});

//Al cargar, la pagina mustra la informacion que habias guardado anteriormente
document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("email").value = email;
    if(info.name1){
        document.getElementById("nombre").value = info.name1;
        document.getElementById("segundo_nombre").value = info.name2;
        document.getElementById("primer_apellido").value = info.lastname1
        document.getElementById("segundo_apellido").value = info.lastname2;
        document.getElementById("telefono").value = info.phone;
    }

    if(info.picture){
      document.getElementById("img").src = info.picture;
    }
});

//Funcion para cambiar la foto
picture.addEventListener('change', e => {
    if( e.target.files[0] ){
        const reader = new FileReader( );
        reader.onload = function( e ){
            img.src = e.target.result;
            info ={
                ...info,
                "picture":  e.target.result,
            }
            localStorage.setItem(`${email}`, JSON.stringify(info));
        }
        reader.readAsDataURL(e.target.files[0])
    } else {
        img.src = "/img/img_perfil.png";
    }
});