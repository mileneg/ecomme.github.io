const ORDER_ASC_BY_PRICE = "$A";
const ORDER_DESC_BY_PRICE = "$D";
const ORDER_BY_PROD_SOLDCOUNT = "Sold";
let productsArray = [];
let order = [];
let minCount = undefined;
let maxCount = undefined;

/* Esta función sirve para ordenar los productos por precio o cantidad de unidades venidas. */
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

/* Esta función se utiliza para almacenar el id de un producto y redirigir al usuario a una página donde se mostrará información detallada sobre ese producto específico. */
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

/* Esta función se encarga de generar y mostrar en la página web una lista de productos que cumplen la condición del rango de precios.  */
function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let article = array[i];
       
        if (((minCount == undefined) || (minCount != undefined && parseInt(article.cost) >= minCount)) &&
           ((maxCount == undefined) || (maxCount != undefined && parseInt(article.cost) <= maxCount))){
       
            htmlContentToAppend += `
                <div onclick="setProductID(${article.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + article.image + `" alt="product image" class="img-thumbnail">
                        </div>
                         <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                               <div class="mb-1">
                                    <h4>`+ article.name + ' - ' + article.currency + " " + article.cost + `</h4>
                                    <p> `+ article.description +`</p> 
                                </div>
                                <small class="text-muted">` + article.soldCount + ` vendidos</small> 
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        document.getElementById("container").innerHTML = htmlContentToAppend; 
    }
}
/* Esta función  permite ordenar y mostrar la lista de productos en la página web según un criterio de ordenación específico que se pasa como argumento. */
function sortAndShowCategories(sortCriteria){
    
    order = sortProducts(sortCriteria, productsArray.products);

    showProductsList(order);
}

/* Permite al usuario ordenar la lista de productos y aplicar un filtro de rango de cantidad cuando se interactúa con los elementos de la página web. */
document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(PRODUCTS_URL+localStorage.getItem("catID")+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray.products); 
        }
    });

    document.getElementById("sortAsc").addEventListener("click", ()=>{
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", ()=>{
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", ()=>{
        sortAndShowCategories(ORDER_BY_PROD_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", ()=>{
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList(productsArray.products);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", ()=>{
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList(productsArray.products);
    });
});

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

/* Este código permite buscar productos en función del texto ingresado en el campo de entrada y muestra la lista de productos que coinciden con el término de búsqueda en la página web. */
searchInput.addEventListener('input', ()=> {
  let searchText = searchInput.value.toLowerCase();

  let array = productsArray.products.filter(product => product.name.toLowerCase().includes(searchText)|| product.description.toLowerCase().includes(searchText));
  showProductsList(array);
});