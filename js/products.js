const ARTICULOS = "https://japceibal.github.io/emercado-api/cats_products/"+localStorage.getItem("catID")+".json";

let categoriesArray = [];

function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let articulo = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + articulo.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ articulo.name + ' -  ' + articulo.currency + " "+ articulo.cost + `</h4>
                        <p> `+ articulo.description +`</p> 
                        </div>
                        <small class="text-muted">` + articulo.soldCount + ` artículos</small> 
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("container").innerHTML = htmlContentToAppend; 
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CARS).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray.products); 
        }
    });
    document.getElementById("profile").innerHTML = localStorage.getItem("logeado");
});