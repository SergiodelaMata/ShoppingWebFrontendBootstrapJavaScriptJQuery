
const buttonNewCategory = document.getElementById("buttonNewCategory");

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

    setValueNewCategory(categories);
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

        setValueNewCategory(categories);
    });
}

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
    }

    
})