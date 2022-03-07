function getData()
{
    return $.getJSON("files/test.json");
}

$(".main-container.collapse").on('shown.bs.collapse', function () {    
        $(".main-container.collapse").not($(this)).collapse('hide');
});

getData().done(function(json){
    var categories = json.categories;
    var products = json.products;
    var users = json.users;

    var structureCategory = "";
    for(var i = 0; i < categories.length; i++)
    {
        structureCategory += "<a href='#products" + (i+1) + "' class='col-sm-12 card btn btn-default collapsed justify-content-start text-dark' data-toggle='collapse' style='text-align:left'>" 
            + "<p style='margin-top: 0em; margin-bottom: 0em;'>" + categories[i].nameCategory + "</p>"
            + "</a>" 
            + "<div id='products" + (i+1) + "' class='container main-container collapse in'><div id='listProducts" + (i+1) + "' class='row'>" ;

        var structureProducts = "";
        for(var j = 0; j < products.length; j++)
        {
            if(products[j].idCategory === categories[i].idCategory)
            {
                structureProducts += "<div class='card col-sm-3'>" + products[j].titleProduct + "</div>";
            }
            
        }
        structureCategory += structureProducts;
        structureCategory += "</div></div>";
    }
    $("#categories").append(structureCategory);

});

