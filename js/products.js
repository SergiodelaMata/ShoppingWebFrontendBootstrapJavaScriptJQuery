const buttonNewProduct = document.getElementById("buttonNewProduct");

function getData()
{
    return $.getJSON("files/test.json");
}

if(localStorage.categories !== null && localStorage.categories !== "" 
    && localStorage.products !== null && localStorage.products !== ""
    && localStorage.users !== null && localStorage.users !== "")
{
    var categories = JSON.parse(localStorage.categories);
    var products = JSON.parse(localStorage.products);
    var users = JSON.parse(localStorage.users);

    setValueNewProduct(products);
    buildSelectorCategories(categories);
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

        setValueNewProduct(products);
        buildSelectorCategories(categories);
    });
}

function setValueNewProduct(products)
{
    var codeProductInput = document.getElementById("codeProduct");
    var numProduct = products.length + 1;
    var auxNum = 13 - numProduct.toString().length; //Para obtener el número de ceros que se deben establecer antes del número del código
    var codeProduct = "";

    for(var i = 0; i < auxNum; i++)
    {
        codeProduct += "0";
    }
    codeProduct += numProduct;
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

buttonNewProduct.addEventListener("click", async() => {
    var selectorCategories = document.getElementById("selectorCategory");
    const idCategory = getSelectValues(selectorCategories)[0];

    if(idCategory === "-")
    {
        alert("Por favor, introduzca la categoría para este producto.")
    }
    else
    {
        const codeProduct = document.getElementById("codeProduct").value;
        const titleProduct = document.getElementById("titleProduct").value;
        const description = document.getElementById("description").innerHTML;
        const price = document.getElementById("price").value;
        const numUnits = document.getElementById("numUnits").value;
        const image = document.getElementById("image").value;
    
        const categories = JSON.parse(localStorage.categories);
        const products = JSON.parse(localStorage.products);
    
    }
    
    /*const listCategories = categories.filter(categories => categories.nameCategory === nameCategory);
    if(listCategories.length === 0)
    {
        const newCategory = {
            "idCategory" : parseInt(idCategory),
            "nameCategory" : nameCategory
        }
    
        categories.push(newCategory);
        localStorage.setItem('categories', JSON.stringify(categories));
        alert("La nueva categoría ha sido creada.");
        window.location.href = "home.html";
    }
    else
    {
        alert("La categoría introducida ya existe.");
    }*/

    
})


function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }
  