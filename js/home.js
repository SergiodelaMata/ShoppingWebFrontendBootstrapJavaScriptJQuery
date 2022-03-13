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

    buildCatalog(categories, products);
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
        buildCatalog(categories, products);
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
                structureProducts += 
                    "<div class='card col-sm-6' style='margin-bottom:0.5em;'>" 
                        + "<div class='row'>"
                            + "<div class='easyzoom easyzoom--overlay col-lg-5 col-md-6 col-sm-12 align-self-center' style='text-align:center;'>"
                                + "<a href='" + products[j].image + "'></a>"
                                + "<img class='mainimage' id='imageProduct" + j + "' src='" + products[j].image + "'data-zoom-image='"+ products[j].image + "' style='width:100%;'/>"
                                + "<p style='font-size:0.8em;'>Unidades: " + products[j].numUnits + "</p>"
                                + "<h3 class='text-primary'>" + products[j].price + "€</h3>"
                                + "<button class='btn btn-primary' type='button' style='width:100%;'>Añadir a<br>la cesta</button>"
                            + "</div>"
                            + "<div class='card-body col-lg-7 col-md-6 col-sm-12'>"
                                + "<strong>" + products[j].titleProduct + "</strong>" 
                                + "<p class='text-muted' style='font-size:0.8em;'>" + products[j].codeProduct + "</p>"
                                + "<p style='font-size:0.8em;'>" + products[j].description + "</p>"
                            + "</div>"
                        + "</div>"
                    + "</div>";
            }
            
        }
        structureCategory += structureProducts;
        structureCategory += "</div></div></div>";
    }
    $("#categories").append(structureCategory);
    $('.easyzoom').easyZoom();
}

