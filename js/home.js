function getData()
{
    return $.getJSON("files/test.json");
}

if( localStorage.categories !== "" && localStorage.categories !== null && localStorage.categories !== undefined
    && localStorage.products !== "" && localStorage.products !== null && localStorage.products !== undefined
    && localStorage.users !== "" && localStorage.users !== null && localStorage.users !== undefined)
{
    var categories = JSON.parse(localStorage.categories);
    var products = JSON.parse(localStorage.products);
    var users = JSON.parse(localStorage.users);

    if(localStorage.productsInBag === null || localStorage.productsInBag === undefined)
    {
        localStorage.setItem("productsInBag", JSON.stringify([]));
    }

    buildCatalog(categories, products);
    buildBag();
}
else
{
    getData().done(function(json){
        var categories = json.categories;
        var products = json.products;
        var users = json.users;
    
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('users', JSON.stringify(users));

        locatStorage.setItem('productsInBag', JSON.stringify([]));
        buildCatalog(categories, products);
        buildBag();
    });
}


function buildCatalog(categories, products)
{
    var structureCategory = "";
    for(var i = 0; i < categories.length; i++)
    {
        structureCategory += "<div class='accordion-item'>"
            + "<h5 class='accordion-header' id='category" + (i+1)  + "'>"
                + "<button type='button' data-bs-toggle='collapse' data-bs-target='#products" + (i+1) + "' class='col-sm-12 accordion-button justify-content-start text-dark' aria-expanded='true' aria-controls='products" + (i+1) + "' style='text-align:left; margin-bottom:0.5em'>" 
                + categories[i].nameCategory
                + "</button>" 
            + "</h5>"
            + "<div id='products" + (i+1) + "' class='container accordion-collapse collapse show' aria-labelledby='category" + (i+1)  + "'><div id='listProducts" + (i+1) + "' class='row' style='margin-bottom:0.5em;'>" ;

        var structureProducts = "";
        for(var j = 0; j < products.length; j++)
        {
            if(parseInt(products[j].idCategory) === parseInt(categories[i].idCategory))
            {
                if(parseInt(products[j].numUnits) === 0)
                {
                    structureProducts += 
                    "<div class='card col-sm-6' style='margin-bottom:0.5em;'>" 
                        + "<div class='row'>"
                            + "<div class='col-lg-4 col-md-6 col-sm-12 align-self-center' style='text-align:center;'>"
                                + "<img class='zoom' id='imageProduct" + j + "' src='" + products[j].image + "'style='width:100%; opacity: 0.5'/>"
                                + "<p class='bg-danger' style='font-size:0.8em;'>No hay stock</p>"
                                + "<h3 class='text-primary'>" + products[j].price + "€</h3>"
                            + "</div>"
                            + "<div class='card-body col-lg-8 col-md-6 col-sm-12'>"
                                + "<strong>" + products[j].titleProduct + "</strong>" 
                                + "<p class='text-muted' style='font-size:0.8em;'>" + products[j].codeProduct + "</p>"
                                + "<p style='font-size:0.8em;'>" + products[j].description + "</p>"
                            + "</div>"
                        + "</div>"
                    + "</div>";
                }
                else
                {
                    structureProducts += 
                    "<div class='card col-sm-6' style='margin-bottom:0.5em;'>" 
                        + "<div class='row'>"
                            + "<div class='col-lg-4 col-md-6 col-sm-12 align-self-center' style='text-align:center;'>"
                                + "<img class='zoom' id='imageProduct" + j + "' src='" + products[j].image + "'style='width:100%;'/>"
                                + "<p style='font-size:0.8em;'>Unidades: " + products[j].numUnits + "</p>"
                                + "<h3 class='text-primary'>" + products[j].price + "€</h3>"
                                + "<button class='btn btn-primary' type='button' style='width:100%; margin-bottom:1em;' codeProduct='" + products[j].codeProduct + "' onClick='addProduct(this)'>Añadir a<br>la cesta</button>"
                            + "</div>"
                            + "<div class='card-body col-lg-8 col-md-6 col-sm-12'>"
                                + "<strong>" + products[j].titleProduct + "</strong>" 
                                + "<p class='text-muted' style='font-size:0.8em;'>" + products[j].codeProduct + "</p>"
                                + "<p style='font-size:0.8em;'>" + products[j].description + "</p>"
                            + "</div>"
                        + "</div>"
                    + "</div>";
                }
            }
            
        }
        structureCategory += structureProducts;
        structureCategory += "</div></div></div>";
    }
    $("#categories").append(structureCategory);
}

function addProduct(button)
{
    var containerBagProducts = document.getElementById("bag-products");
    var productsInBag = JSON.parse(localStorage.productsInBag);
    var products = JSON.parse(localStorage.products);

    const codeProduct = button.getAttribute("codeproduct");
    const product = products.filter(products => products.codeProduct === codeProduct)[0];

    if(product.numUnits !== 0)
    {
        if(productsInBag.length !== 0)
        {

        }
        else
        {
            const productIntroduced = {
                "codeProduct": product.codeProduct,
                "titleProduct": product.titleProduct,
                "description": product.description,
                "price": product.price,
                "numUnits": 1,
                "image": product.image
            }
            productsInBag.push(productIntroduced);
            localStorage.setItem("productsInBag", JSON.stringify(productsInBag));
            const divProductBag = document.createElement("div");
            divProductBag.id = productIntroduced.codeProduct;
            divProductBag.classList.add("card");
            containerBagProducts.appendChild(divProductBag);

        }

    }
    else
    {
        button.disabled = true;

    }

    /*if(productsInBag.length === 0 || productsInBag.filter(productsInBag => productsInBag.codeproduct === codeproduct))
    {

    }*/

}

function buildBag(){
    var containerBagProducts = document.getElementById("bag-products");
    var productsInBag = JSON.parse(localStorage.productsInBag);

    var divTotalPrice = document.createElement("div");
    divTotalPrice.classList.add("card");
    containerBagProducts.appendChild(divTotalPrice);

    var divRowTotalPrice = document.createElement("div");
    divRowTotalPrice.classList.add("row");
    divTotalPrice.appendChild(divRowTotalPrice);

    var divTextTotal = document.createElement("div");
    divTextTotal.classList.add("col-sm-12");
    divTextTotal.classList.add("col-md-6");
    divTextTotal.classList.add("col-lg-6");
    divRowTotalPrice.appendChild(divTextTotal);

    var pTextTotalPrice = document.createElement("h5");
    pTextTotalPrice.textContent = "Coste Total:";
    pTextTotalPrice.style.marginLeft = "0.5em";
    divTextTotal.appendChild(pTextTotalPrice);

    var divTotalPriceText = document.createElement("div");
    divTotalPriceText.classList.add("col-sm-12");
    divTotalPriceText.classList.add("col-md-6");
    divTotalPriceText.classList.add("col-lg-6");
    divTotalPriceText.style.textAlign = "right";
    divRowTotalPrice.appendChild(divTotalPriceText);

    var totalPrice = document.createElement("p");
    totalPrice.textContent = "0 €";
    totalPrice.style.marginRight = "0.5em";
    divTotalPriceText.appendChild(totalPrice);

    for(var i = 0; i < productsInBag.length; i++)
    {

    }

}