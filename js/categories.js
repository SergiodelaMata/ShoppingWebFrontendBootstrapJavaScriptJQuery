function getArrayCategories()
{
    return $.getJSON("files/categories.json");
}

function getArrayProducts()
{
    return $.getJSON("files/products.json");
}

function getListProducts(){
    var json = getArrayProducts().done(function(jsonProducts){
        return jsonProducts;
    });
    return json;
}


getArrayCategories().done(function(jsonCategories) {
    console.log(jsonCategories);
    var structureCategory = "";

    for(var i = 0; i < jsonCategories.length; i++)
    {
        structureCategory += "<a href='products" + (i+1) + "' class='col-sm-12 card btn btn-default collapsed justify-content-start text-dark' data-toggle='collapse' style='text-align:left'>" 
            + "<p style='margin-top: 0em; margin-bottom: 0em;'>" + jsonCategories[i].nameCategory + "</p>"
            + "</a>" 
            + "<div id='products" + (i+1) + "' class='row'>";

        console.log(getListProducts());
        /*getArrayProducts().done(function(jsonProducts){
            console.log(jsonProducts);
            var structureProducts = "";
            for(var j = 0; j < jsonProducts.length; j++)
            {
                console.log(jsonCategories[i]);
                if(jsonProducts[j].idCategory === jsonCategories[i].idCategory)
                {
                    structureProducts += "<div class='card col-sm-3'>" + jsonProducts[j].titleProduct + "</div>";
                }
                
            }
            structureCategory += structureProducts;
        });*/
        structureCategory = "</div>";
    }
    $("#categories").append(structureCategory);
    

});
