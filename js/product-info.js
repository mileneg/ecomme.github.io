const lista = document.getElementById("list");
const btn = document.querySelector("input");
let micomnt = JSON.parse(sessionStorage.getItem("miscoments"+localStorage.getItem("productID"))) || [];

function showProductInfo(product){

    let htmlContentToAppend = `
            <div class="list-group-item list-group-item-action cursor-active">
                <h1>${product.name}</h1>
                <div> <br>
                    <p>Precio: ${product.currency} ${product.cost}</p>
                </div>
                <div><br>
                    <p>Descripcion:</p> ${product.description}  
                </div>
                <div><br>
                    <p>Categoria:</p>  ${product.category}
                </div>
                <div><br>
                    <p>Cantidad de vendidos:</p>
                    ${product.soldCount}
                </div><br>
                <div class="row">
                
                <p>Imagenes ilustrativas:</p>
                   <div class="slider-wrapper"> 
                        <div class="slider"> 
                        ${showPictures(product.images)}
                        </div>
                        <div class="slider-nav"> 
                   <a href="#slider-1"> </a>
                   <a href="#slider-2"> </a>
                   <a href="#slider-3"> </a>
                   <a href="#slider-4"> </a>

                   </div> 
                    </div> 
                </div>
            </div>
            `
        document.getElementById("container").innerHTML = htmlContentToAppend;
    }

function showPictures(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let foto = array[i];
        htmlContentToAppend +=`
                <img id="slider-${i+1}" src="${foto}" alt="">
            `
    }
    return htmlContentToAppend;
}

function Score(n) {
    let htmlContentToAppend="";
    let x=0;
    for(let i=n; i>0; i--){
        htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
        x++;
    };
    for (x; x<5; x++){
        htmlContentToAppend += `<span class="fa fa-star"></span>`;
    };
    return htmlContentToAppend;
};

function showComments(comentarios){
    comentarios.forEach(coment => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `${coment.user} - ${coment.dateTime} - ${Score(coment.score)} <br>
        ${coment.description}` ;
        lista.appendChild(li);
    });
}


document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(PRODUCT_INFO_URL+localStorage.getItem("productID")+".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            productArray = resultObj.data;
            showProductInfo(productArray)
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL+localStorage.getItem("productID")+".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            commentsArray = resultObj.data;
            console.log(commentsArray);
            showComments(commentsArray);
        }
    })

    showComments(micomnt);
});

btn.addEventListener("click",()=>{
    let comentario = document.getElementById("opinion").value;
    let stars = document.querySelector("select").value;
    var date = new Date();
    var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
    var date_time = current_date+" "+current_time;    
   
    let data = [{
        user: localStorage.getItem("logeado"),
        description: comentario,
        score: stars,
        dateTime: `${date_time}`
    }];
    micomnt.push(data[0]);
    sessionStorage.setItem("miscoments"+localStorage.getItem("productID"), JSON.stringify(micomnt));

    showComments(data);
})
