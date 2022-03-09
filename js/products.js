function getData()
{
    return $.getJSON("files/test.json");
}

getData().done(function(json){

    var categories = json.categories;
    var products = json.products;
    var users = json.users;

    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('users', JSON.stringify(users));
    
    setValueNewProduct(products);
    buildSelectorCategories(categories);
});

function setValueNewProduct(products)
{
    var codeProductInput = document.getElementById("codeProduct");
    var numProduct = products.length + 1;
    console.log(numProduct);
    var auxNum = 13 - numProduct.toString().length; //Para obtener el número de ceros que se deben establecer antes del número del código
    console.log(auxNum);
    var codeProduct = "";

    for(var i = 0; i < auxNum; i++)
    {
        codeProduct += "0";
    }
    codeProduct += numProduct;
    console.log(codeProduct);
    codeProductInput.value = codeProduct;
}

function buildSelectorCategories(categories)
{
    var selectorCategories = document.getElementById("selectorCategory");
    for(var i = 0; i < categories.length; i++)
    {
        var optionCategory = document.createElement("option");
        optionCategory.value = categories[i].idCategory;
        optionCategory.innerHTML = categories[i].nameCategory;
        selectorCategories.appendChild(optionCategory);
    }
}
