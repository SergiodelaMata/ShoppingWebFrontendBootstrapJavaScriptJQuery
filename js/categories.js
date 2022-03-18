
const buttonNewCategory = document.getElementById("buttonNewCategory");

//Proporciona los datos iniciales de la página
function getData()
{
    return $.getJSON("files/test.json");
}

//Realiza una comprobación inicial para saber si hay datos guardados disponibles o no, en caso de disponer de datos, 
// no se cargan los datos del fichero y se obtiene el nuevo valor para la siguiente categoría creada
if( localStorage.categories !== "" && localStorage.categories !== null && localStorage.categories !== undefined
    && localStorage.products !== "" && localStorage.products !== null && localStorage.products !== undefined
    && localStorage.users !== "" && localStorage.users !== null && localStorage.users !== undefined)
{
    var categories = JSON.parse(localStorage.categories);
    var products = JSON.parse(localStorage.products);
    var users = JSON.parse(localStorage.users);

    setValueNewCategory(categories);
}
//En caso de no disponer de datos previamente guardados, se obtienen del fichero y luego se obtiene el nuevo valor para la siguiente categoría creada
else
{
    getData().done(function(json){

        var categories = json.categories;
        var products = json.products;
        var users = json.users;
    
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('users', JSON.stringify(users));

        setValueNewCategory(categories);
    });
}

//Permite obtener el número identificador para la nueva categoría
function setValueNewCategory(categories)
{
    var idCategoryInput = document.getElementById("idCategory");
    var idCategory = categories.length + 1;
    idCategoryInput.value = idCategory;
}

buttonNewCategory.addEventListener("click", async() => {
    const idCategory = document.getElementById("idCategory").value;
    const nameCategory = document.getElementById("nameCategory").value;
    const categories = JSON.parse(localStorage.categories);

    const listCategories = categories.filter(categories => categories.nameCategory === nameCategory);
    //Comprueba si la categoría no se encotraba ya disponible, y en tal caso la crea
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
    //En caso contrario, avisa al usuario de que ya existe
    else
    {
        alert("La categoría introducida ya existe.");
    }
})