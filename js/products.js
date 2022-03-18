const buttonNewProduct = document.getElementById("buttonNewProduct");

//Proporciona los datos iniciales de la página
function getData()
{
    return $.getJSON("files/test.json");
}

//Realiza una comprobación inicial para saber si hay datos guardados disponibles o no, en caso de disponer de datos, 
// no se cargan los datos del fichero y se obtiene el nuevo valor para el siguiente producto creado
if( localStorage.categories !== "" && localStorage.categories !== null && localStorage.categories !== undefined
    && localStorage.products !== "" && localStorage.products !== null && localStorage.products !== undefined
    && localStorage.users !== "" && localStorage.users !== null && localStorage.users !== undefined)
{
    var categories = JSON.parse(localStorage.categories);
    var products = JSON.parse(localStorage.products);
    var users = JSON.parse(localStorage.users);

    setValueNewProduct(products);
    buildSelectorCategories(categories);
}
//En caso de no disponer de datos previamente guardados, se obtienen del fichero y luego se obtiene el nuevo valor para el siguiente producto creado
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

//Permite obtener el identificador para el nuevo producto
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

//Permite crear un selector para poder seleccionar entre todas las categorías disponibles
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

    //En caso de no seleccionar ninguna de las categorías disponibles, se avisa al usuario de ello
    if(idCategory === "-")
    {
        alert("Por favor, introduzca la categoría para este producto.")
    }
    //En caso contrario, se comprueba si se puede introducir el producto
    else
    {
        const codeProduct = document.getElementById("codeProduct").value;
        const titleProduct = document.getElementById("titleProduct").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const numUnits = document.getElementById("numUnits").value;
        const image = document.getElementById("image").value;
    
        const products = JSON.parse(localStorage.products);
    
        const listProducts = products.filter(products => products.titleProduct === titleProduct);
        //En caso de no encontrarse en el listado, se introduce en él
        if(listProducts.length === 0)
        {
            const newProduct = {
                "codeProduct" : codeProduct,
                "idCategory" : idCategory,
                "titleProduct" : titleProduct,
                "description" : description,
                "price" : parseFloat(price),
                "numUnits" : parseInt(numUnits),
                "image" : image
            }

            console.log(newProduct);
        
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            alert("El producto ha sido creado e introducido en su respectiva categoría.");
            window.location.href = "home.html";
        }
        //En caso contrario, se avisa al usuario de que el producto ya se encontraba disponible
        else
        {
            alert("El producto introducido ya existe.");
        }
    }
})

//Permite obtener las opciones seleccionadas dentro de un selector
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
  