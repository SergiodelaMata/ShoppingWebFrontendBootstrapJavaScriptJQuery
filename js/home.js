//Proporciona los datos iniciales de la página
function getData()
{
    return $.getJSON("files/test.json");
}

//Realiza una comprobación inicial para saber si hay datos guardados disponibles o no, en caso de disponer de datos, 
// no se cargan los datos del fichero y construye las estructuras de los productos disponibles por categorías y los productos en 
// la cesta
if( localStorage.categories !== "" && localStorage.categories !== null && localStorage.categories !== undefined
    && localStorage.products !== "" && localStorage.products !== null && localStorage.products !== undefined
    && localStorage.users !== "" && localStorage.users !== null && localStorage.users !== undefined)
{
    var categories = JSON.parse(localStorage.categories);
    var products = JSON.parse(localStorage.products);
    var users = JSON.parse(localStorage.users);

    //Comprueba si hay datos aún de la cesta de productos y en tal caso, introduce un array vacío para poder introducir los datos más adelante 
    if(localStorage.productsInBag === null || localStorage.productsInBag === undefined)
    {
        localStorage.setItem("productsInBag", JSON.stringify([]));
    }

    buildCatalog(categories, products);
    buildBag();
}
//En caso de no disponer de datos previamente guardados, se obtienen del fichero y luego se construyen las estructuras necesarias 
// para mostrar los datos de los productos disponibles y de la cesta
else
{
    getData().done(function(json){
        var categories = json.categories;
        var products = json.products;
        var users = json.users;
    
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('users', JSON.stringify(users));

        localStorage.setItem('productsInBag', JSON.stringify([]));
        buildCatalog(categories, products);
        buildBag();
    });
}

//Permite crear la estructura del catálogo de los productos disponibles clasificados por categoría
function buildCatalog(categories, products)
{
    var structureCategory = "";
    var productsInBag = JSON.parse(localStorage.productsInBag);
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
            //Establece por defecto a desactivado el botón de añadir unidades de un producto si se cuenta con el mismo número 
            // de unidades disponibles que las que hay en la cesta y muestra la imagen del producto semitransparente
            if(parseInt(products[j].idCategory) === parseInt(categories[i].idCategory))
            {
                product = productsInBag.filter(product => product.codeProduct === products[j].codeProduct);
                
                if(product[0] !== undefined && parseInt(products[j].numUnits) === parseInt(product[0].numUnits))
                {
                    structureProducts += 
                    "<div class='card col-sm-6' style='margin-bottom:0.5em;'>" 
                        + "<div class='row'>"
                            + "<div class='col-lg-4 col-md-6 col-sm-12 align-self-center' style='text-align:center;opacity: 0.5; margin-top: 1em;'>"
                                + "<img class='zoom' id='imageProduct" + j + "' src='" + products[j].image + "'style='width:100%;'/>"
                                + "<p style='font-size:0.8em;'>Unidades: " + products[j].numUnits + "</p>"
                                + "<h3 class='text-primary'>" + products[j].price + "€</h3>"
                                + "<button id='buttonProduct" + j + "' class='btn btn-primary' type='button' style='width:100%; margin-bottom:1em;' codeProduct='" + products[j].codeProduct + "' onClick='addProduct(this)' disabled='true' title='Agregar a la cesta'>Añadir a<br>la cesta</button>"
                            + "</div>"
                            + "<div class='card-body col-lg-8 col-md-6 col-sm-12'>"
                                + "<strong>" + products[j].titleProduct + "</strong>" 
                                + "<p class='text-muted' style='font-size:0.8em;'>" + products[j].codeProduct + "</p>"
                                + "<p style='font-size:0.8em;'>" + products[j].description + "</p>"
                            + "</div>"
                        + "</div>"
                    + "</div>";
                }
                //Elimina el botón para añadir unidades y muestra un mensaje indicando que no queda stock del producto y 
                // mostrando de manera semitransparente la imagen del producto
                else if(parseInt(products[j].numUnits) === 0)
                {
                    structureProducts += 
                    "<div class='card col-sm-6' style='margin-bottom:0.5em;'>" 
                        + "<div class='row'>"
                            + "<div class='col-lg-4 col-md-6 col-sm-12 align-self-center' style='text-align:center;'>"
                                + "<img class='zoom' id='imageProduct" + j + "' src='" + products[j].image + "'style='width:100%; opacity: 0.5; margin-top: 1em;'/>"
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
                //Muestra todo el contenido del producto, el botón para añadir unidades a la cesta está operativo y 
                // la imagen del producto se ve completamente sin ningún tipo de transparencia
                else
                {
                    structureProducts += 
                    "<div class='card col-sm-6' style='margin-bottom:0.5em;'>" 
                        + "<div class='row'>"
                            + "<div class='col-lg-4 col-md-6 col-sm-12 align-self-center' style='text-align:center;'>"
                                + "<img class='zoom' id='imageProduct" + j + "' src='" + products[j].image + "'alt='" + products[j].titleProduct + "' title='" + products[j].titleProduct + "' style='width:100%; margin-top: 1em;'/>"
                                + "<p style='font-size:0.8em;'>Unidades: " + products[j].numUnits + "</p>"
                                + "<h3 class='text-primary'>" + products[j].price + "€</h3>"
                                + "<button id='buttonProduct" + j + "' class='btn btn-primary' type='button' style='width:100%; margin-bottom:1em;' codeProduct='" + products[j].codeProduct + "' onClick='addProduct(this)' title='Agregar a la cesta'>Añadir a<br>la cesta</button>"
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

//Permite introducir un nuevo producto a la cesta o añadir una unidad más del producto a la cesta
function addProduct(button)
{
    var productsInBag = JSON.parse(localStorage.productsInBag);
    var products = JSON.parse(localStorage.products);

    const codeProduct = button.getAttribute("codeproduct");
    const product = products.filter(products => products.codeProduct === codeProduct)[0];

    //Se comprueba que el producto cuenta con unidades
    if(product.numUnits !== 0)
    {
        //Se comprueba que la cesta no está vacía. En tal caso revisa si se puede o no introducir
        if(productsInBag.length !== 0)
        {
            //Se comprueba si el producto ya se encontraba en la cesta. En caso de encontrarse, se revisa si se puede introducir 
            const productInBag = productsInBag.filter(product => product.codeProduct === codeProduct)[0];
            if(productInBag !== undefined && productInBag !== null)
            {
                //Se comprueba si el número de unidades en la cesta es inferior al número de unidades disponibles menos 1 y si es así
                // incrementa en una unidad el número de unidades del producto en la cesta
                if(productInBag.numUnits < product.numUnits - 1)
                {
                    let index = productsInBag.findIndex( product => product.codeProduct === codeProduct);
                    const productUpdated = {
                        "codeProduct": productsInBag[index].codeProduct,
                        "titleProduct": productsInBag[index].titleProduct,
                        "description": productsInBag[index].description,
                        "price": productsInBag[index].price,
                        "numUnits": productsInBag[index].numUnits + 1,
                        "image": productsInBag[index].image
                    }
                    productsInBag[index] = productUpdated;
                    localStorage.setItem("productsInBag", JSON.stringify(productsInBag));
                }
                //En caso de que sea igual el número de unidades en la cesta al número de unidades en stock menos 1,
                // en ese caso se hace lo mismo que en el caso anterior pero se deshabilita el botón para añadir unidades
                else if(productInBag.numUnits === product.numUnits - 1)
                {
                    button.disabled = true;
                    let index = productsInBag.findIndex( product => product.codeProduct === codeProduct);
                    const productUpdated = {
                        "codeProduct": productsInBag[index].codeProduct,
                        "titleProduct": productsInBag[index].titleProduct,
                        "description": productsInBag[index].description,
                        "price": productsInBag[index].price,
                        "numUnits": productsInBag[index].numUnits + 1,
                        "image": productsInBag[index].image
                    }
                    productsInBag[index] = productUpdated;
                    localStorage.setItem("productsInBag", JSON.stringify(productsInBag));
                }
                //En el caso de no cumplirse los casos anteriores, simplemente se deshabilita el botón para añadir a la cesta
                else
                {
                    button.disabled = true;

                }
            }
            //En caso de no encontrarse, lo introduce directamente a la cesta
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
            }
        }
        //En caso de estar vacía, lo introduce directamente a la cesta
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
        }
    }
    else
    {
        button.disabled = true;

    }
    buildBag();
}

//Permite eliminar un nuevo producto de la cesta o eliminar una unidad del producto de la cesta
function removeProduct(button)
{
    var productsInBag = JSON.parse(localStorage.productsInBag);

    const codeProduct = button.getAttribute("codeproduct");
    const product = productsInBag.filter(products => products.codeProduct === codeProduct)[0];
    const index = productsInBag.findIndex(products => products.codeProduct === codeProduct);

    //Comprueba si solo existe una unidad del producto y en tal caso lo saca de la cesta
    if(parseInt(product.numUnits) === 1)
    {
        productsInBag = productsInBag.filter(function(element){
            return element != product;
        })
        localStorage.setItem("productsInBag", JSON.stringify(productsInBag));
    }
    //En caso contrario elimina una unidad del producto de la cesta
    else
    {
        const productUpdated = {
            "codeProduct": productsInBag[index].codeProduct,
            "titleProduct": productsInBag[index].titleProduct,
            "description": productsInBag[index].description,
            "price": productsInBag[index].price,
            "numUnits": productsInBag[index].numUnits - 1,
            "image": productsInBag[index].image
        }
        productsInBag[index] = productUpdated;
        localStorage.setItem("productsInBag", JSON.stringify(productsInBag));
    }

    buildBag();

}

//Permite construir la estructura que va a contener la cesta de los productos a comprar
function buildBag(){
    var containerBagProducts = document.getElementById("bag-products");
    removeAllChildNodes(containerBagProducts);
    var products = JSON.parse(localStorage.products);
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
    pTextTotalPrice.style.marginTop = "0.5em";
    pTextTotalPrice.style.marginBottom = "0.5em";
    divTextTotal.appendChild(pTextTotalPrice);

    var divTotalPriceText = document.createElement("div");
    divTotalPriceText.classList.add("col-sm-12");
    divTotalPriceText.classList.add("col-md-6");
    divTotalPriceText.classList.add("col-lg-6");
    divTotalPriceText.style.textAlign = "right";
    divRowTotalPrice.appendChild(divTotalPriceText);

    var totalPrice = document.createElement("p");
    totalPrice.textContent = additionTotalPrice() + " €";
    totalPrice.style.marginTop = "0.5em";
    totalPrice.style.marginRight = "0.5em";
    totalPrice.style.marginBottom = "0.5em";
    divTotalPriceText.appendChild(totalPrice);

    var divFinishBuy = document.createElement("div");
    divFinishBuy.classList.add("container");
    divFinishBuy.classList.add("col-sm-12");
    divFinishBuy.classList.add("col-md-12");
    divFinishBuy.classList.add("col-lg-12");
    divFinishBuy.style.width = "100%";
    divRowTotalPrice.appendChild(divFinishBuy);

    var buttonFinishBuy = document.createElement("button");
    buttonFinishBuy.textContent = "Realizar pedido";
    buttonFinishBuy.title = "Realizar pedido";
    buttonFinishBuy.type = "button";
    buttonFinishBuy.classList.add("btn");
    buttonFinishBuy.classList.add("btn-primary");
    buttonFinishBuy.style.width = "100%";
    //Comprueba si la cesta está vacía. En caso de no ser así, se encuentra un botón habilitado para poder realizar la compra
    if(productsInBag.length !== 0)
    {
        buttonFinishBuy.setAttribute("onClick", "makeBuy()");
        buttonFinishBuy.removeAttribute("disabled");
    }
    //En caso contrario, deshabilita el botón para realizar la compra
    else
    {
        buttonFinishBuy.disabled = true;
    }
    divFinishBuy.appendChild(buttonFinishBuy);

    for(var i = 0; i < productsInBag.length; i++)
    {
        var divProductBag = document.createElement("div");
        divProductBag.classList.add("card");
        divProductBag.classList.add("col-sm-12");
        divProductBag.classList.add("col-md-12");
        divProductBag.classList.add("col-lg-12");
        divProductBag.style.marginTop = "0.5em";
        containerBagProducts.appendChild(divProductBag);

        var divRowProductBag = document.createElement("div");
        divRowProductBag.classList.add("row");
        divProductBag.appendChild(divRowProductBag);

        var divLeftSideCard = document.createElement("div");
        divLeftSideCard.classList.add("align-self-center");
        divLeftSideCard.classList.add("col-sm-12");
        divLeftSideCard.classList.add("col-md-6");
        divLeftSideCard.classList.add("col-lg-5");
        divLeftSideCard.style.textAlign = "center";
        divRowProductBag.appendChild(divLeftSideCard);

        var imageProduct = document.createElement("img");
        imageProduct.classList.add("zoom");
        imageProduct.src = productsInBag[i].image;
        imageProduct.alt = productsInBag[i].titleProduct;
        imageProduct.title = productsInBag[i].titleProduct;
        imageProduct.style.width = "80%";
        divLeftSideCard.appendChild(imageProduct);

        var divUnitsButtons = document.createElement("div");
        divUnitsButtons.classList.add("container");
        divLeftSideCard.appendChild(divUnitsButtons);


        var divUnits = document.createElement("div");
        divUnits.classList.add("row");
        divUnits.style.marginTop = "1em";
        divUnitsButtons.appendChild(divUnits);

        var removeUnitProduct = document.createElement("button");
        removeUnitProduct.type = "button";
        removeUnitProduct.title = "Eliminar de la cesta";
        removeUnitProduct.classList.add("btn");
        removeUnitProduct.classList.add("btn-primary");
        removeUnitProduct.setAttribute("codeProduct", productsInBag[i].codeProduct);
        removeUnitProduct.setAttribute("onClick", "removeProduct(this)");
        removeUnitProduct.style.width = "33%";
        divUnits.appendChild(removeUnitProduct);

        var iconRemove = document.createElement("img");
        iconRemove.src = "img/dash.svg";
        removeUnitProduct.appendChild(iconRemove);

        var divUnitsText = document.createElement("div");
        divUnitsText.style.width = "33%";
        divUnits.appendChild(divUnitsText);


        var unitsProduct = document.createElement("p");
        unitsProduct.textContent = productsInBag[i].numUnits;
        unitsProduct.style.textAlign = "center";
        unitsProduct.style.fontSize = "1em";
        divUnitsText.appendChild(unitsProduct);

        var addUnitProduct = document.createElement("button");
        addUnitProduct.type = "button";
        addUnitProduct.title = "Agregar a la cesta";
        addUnitProduct.classList.add("btn");
        addUnitProduct.classList.add("btn-primary");
        addUnitProduct.setAttribute("codeProduct", productsInBag[i].codeProduct);
        addUnitProduct.setAttribute("onClick", "addProduct(this)");
        addUnitProduct.style.width = "33%";
        var product = products.filter(product => product.codeProduct === productsInBag[i].codeProduct);
        var index = products.findIndex(product => product.codeProduct === productsInBag[i].codeProduct);
        var imageProduct = document.getElementById("imageProduct" + index);
        var buttonProduct = document.getElementById("buttonProduct" + index);
        //Comprueba si el número de unidades del producto son menores o iguales al número de unidades del producto en la cesta
        // y en ese caso deshabilita los botones del producto para añadir unidades al producto y vuelve semitransparente la imagen del producto
        if(parseInt(product[0].numUnits) <= parseInt(productsInBag[i].numUnits))
        {
            addUnitProduct.setAttribute("disabled", "true");
            imageProduct.style.opacity = "0.5";
            buttonProduct.setAttribute("disabled", "true");
        }
        //En caso contrario, deja habilitados los botones para añadir unidades del producto en la cesta y muestra la imagen del producto 
        // sin transparencia
        else
        {
            addUnitProduct.removeAttribute("disabled");
            imageProduct.style.opacity = "1";
            buttonProduct.removeAttribute("disabled");
        }
        divUnits.appendChild(addUnitProduct);

        var iconAdd = document.createElement("img");
        iconAdd.src = "img/plus.svg";
        addUnitProduct.appendChild(iconAdd);

        var priceProduct = document.createElement("h3");
        priceProduct.classList.add("text-primary");
        priceProduct.style.textAlign = "center";
        priceProduct.textContent = productsInBag[i].price + " €";
        divLeftSideCard.appendChild(priceProduct);

        var divRightSideCard = document.createElement("div");
        divRightSideCard.classList.add("card-body");
        divRightSideCard.classList.add("col-sm-12");
        divRightSideCard.classList.add("col-md-6");
        divRightSideCard.classList.add("col-lg-7");
        divRowProductBag.appendChild(divRightSideCard);

        var titleProduct = document.createElement("strong");
        titleProduct.textContent = productsInBag[i].titleProduct;
        divRightSideCard.appendChild(titleProduct);

        var codeProduct = document.createElement("p");
        codeProduct.classList.add("text-muted");
        codeProduct.style.fontSize = "0.8em";
        codeProduct.textContent = productsInBag[i].codeProduct;
        divRightSideCard.appendChild(codeProduct);

        var descriptionProduct = document.createElement("p");
        descriptionProduct.textContent = productsInBag[i].description;
        descriptionProduct.style.fontSize = "0.8em";
        divRightSideCard.appendChild(descriptionProduct);

    }
}

//Permite eliminar todos los nodos hijos del nodo indicado del documento
function removeAllChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

//Permite realiza la suma total de los productos del número de unidades de cada producto con su respectivo precio
function additionTotalPrice()
{
    var productsInBag = JSON.parse(localStorage.productsInBag);
    var totalPrice = 0;
    for(var i = 0; i < productsInBag.length; i++)
    {
        totalPrice += productsInBag[i].price * productsInBag[i].numUnits;
    }
    totalPrice = Math.round(totalPrice * 100) / 100;
    return totalPrice;
}

//Muetra un popup para visualizar que se ha realizado correctamente la compra
function makeBuy()
{
    var totalPrice = additionTotalPrice();
    var priceText = document.getElementById("priceText");
    priceText.textContent = "El pago total ha sido de " + totalPrice + " €";
    openModal();
}

//Elimina el número de unidades que hay de los distintos de productos en la cesta en los productos en stock y elimina lo que hubiera en la cesta
function removeUnits(){
    var products = JSON.parse(localStorage.products);
    var productsInBag = JSON.parse(localStorage.productsInBag);

    for(let i = 0; i < productsInBag.length; i++)
    {
        var product = products.filter(product => product.codeProduct === productsInBag[i].codeProduct)[0];
        var index = products.findIndex(product => product.codeProduct === productsInBag[i].codeProduct);
        product.numUnits -= productsInBag[i].numUnits;
        products[index] = product;
    }

    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('productsInBag', JSON.stringify([]));
    
}

//Muestra el popup creado
function openModal() {
    let element = document.getElementById('overlay')
    element.style.display = 'block'
}

//Oculta el popup creado y realiza limpieza de los productos en el carrito y de las unidades ya no disponibles de cada producto
function closeModal() {
    let element = document.getElementById('overlay')
    element.style.display = 'none'
    removeUnits();
    location.reload();
}