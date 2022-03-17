localStorage.setItem("showNavbarSmall", false);
adminSections();
statusLogin();
page();

window.onresize = positionLoginDropdown;
positionLoginDropdown();

//Permite ajustar el menu dropdown de login de acuerdo a las dimensiones de la ventana
function positionLoginDropdown()
{
    var dropdownMenu = document.getElementById("dropdown-menu")
    //Se ajustara el dropdown si existe, es decir, no ha iniciado sesión
    if(dropdownMenu !== null && dropdownMenu !== undefined)
    {
        //Si ancho interior de la ventana es superior o igual a 559px se ajusta algo por debajo el menú
        if($(document).innerWidth() >= 559)
        {
            dropdownMenu.classList.add("mt-5");
        }
        //Si ancho interior de la ventana es menor a 559px se deja a la misma altura que el botón de login
        else
        {
            dropdownMenu.classList.remove("mt-5");
        }
    }
}

//Permite mostrar en que pestaña de la barra de navegación se encuentra resaltándola
function page(){
    var url = window.location.href;
    //Si se encuentra en la página para introducir un nuevo producto, ésta aparece resaltada
    if(url.includes("/newProduct.html"))
    {
        const element = document.getElementById("newProductA");
        element.classList.add("active");
        console.log(element);

    }
    //Si se encuentra en la página para introducir una nueva categoría, ésta aparece resaltada
    else if(url.includes("/newCategory.html"))
    {
        const element = document.getElementById("newCategoryA");
        element.classList.add("active");
        console.log(element);
    }
}

//Permite mostrar las secciones del administrador si se ha iniciado sesión y se accede con usuario con rol de administrador
function adminSections(){
    var userEmail = sessionStorage.getItem('email');
    var userRole = sessionStorage.getItem('role');

    //Se comprueba si se ha iniciado sesión y el usuario que ha iniciado tiene rol de administrador para añadir las secciones de adminstrador a la barra de navegación
    if(userEmail !== "" && userEmail !== null && userEmail !== undefined && userRole === "admin")
    {
        var liNewCategory = document.getElementById("newCategory");
        liNewCategory.classList.add("nav-item");
        liNewCategory.style.textAlign = "center";

        var newCategoryButton = document.createElement("a");
        newCategoryButton.id = "newCategoryA";
        newCategoryButton.classList.add("nav-link");
        newCategoryButton.href = "/newCategory.html";
        newCategoryButton.innerText = "Nueva categoría";
        liNewCategory.appendChild(newCategoryButton);

        var liNewProduct = document.getElementById("newProduct");
        liNewProduct.classList.add("nav-item");
        liNewProduct.style.textAlign = "center";

        var newProductButton = document.createElement("a");
        newProductButton.id = "newProductA";
        newProductButton.classList.add("nav-link");
        newProductButton.href = "/newProduct.html";
        newProductButton.innerText = "Nuevo producto";
        liNewProduct.appendChild(newProductButton);
    }
}

//Permite comprobar si el usuario a iniciado o no sesión para permitir cerrar sesión o iniciarla respectivamente
function statusLogin(){
    var userEmail = sessionStorage.getItem('email');
    var loginLogout = document.getElementById("loginlogout");
    var li = document.createElement("li");
    var button = document.createElement("button");
    
    //Si no se ha iniciado sesión, se establece un botón con un menú dropdown para poder iniciar sesión
    if(userEmail === "" || userEmail === null || userEmail === undefined)
    {
        li.classList.add("dropdown");
        li.classList.add("order-1");
        button.innerHTML = "Login";
        button.type = "button";
        button.id = "login";
        button.classList.add("btn");
        button.classList.add("btn-outline-secondary");
        button.classList.add("dropdown-toggle");
        button.style.textAlign = "center";
        button.setAttribute("data-toggle", "dropdown");

        var ul = document.createElement("ul");
        ul.id = "dropdown-menu";
        ul.classList.add("dropdown-menu");
        ul.classList.add("dropdown-menu-right");
        ul.style.marginRight = "3em";

        var liDropdown = document.createElement("li");
        liDropdown.classList.add("px-3");
        liDropdown.classList.add("py-2");

        var form = document.createElement("form");
        form.classList.add("form");
        form.setAttribute("role", "form");

        var divEmail = document.createElement("div");
        divEmail.classList.add("form-group");
        divEmail.classList.add("container");

        var inputEmail = document.createElement("input");
        inputEmail.id = "emailInput";
        inputEmail.classList.add("form-control");
        inputEmail.classList.add("form-control-sm");
        inputEmail.setAttribute("placeholder", "Email");
        inputEmail.type = "text";
        inputEmail.setAttribute("required", true);
        divEmail.appendChild(inputEmail);

        var divPassword = document.createElement("div");
        divPassword.classList.add("form-group");
        divPassword.classList.add("container");

        var inputPassword = document.createElement("input");
        inputPassword.id = "passwordInput";
        inputPassword.classList.add("form-control");
        inputPassword.classList.add("form-control-sm");
        inputPassword.setAttribute("placeholder", "Contraseña");
        inputPassword.type = "password";
        inputPassword.setAttribute("required", true);
        divPassword.appendChild(inputPassword);

        var divSubmitLogin = document.createElement("div");
        divSubmitLogin.classList.add("form-group");
        divSubmitLogin.classList.add("container");

        var buttonSubmitLogin = document.createElement("button");
        buttonSubmitLogin.classList.add("btn");
        buttonSubmitLogin.classList.add("btn-primary");
        buttonSubmitLogin.classList.add("btn-block");
        buttonSubmitLogin.type = "button";
        buttonSubmitLogin.innerHTML = "Login";
        buttonSubmitLogin.style.marginTop = "1em";
        buttonSubmitLogin.style.width = "100%";
        divSubmitLogin.appendChild(buttonSubmitLogin);

        form.appendChild(divEmail);
        form.appendChild(divPassword);
        form.appendChild(divSubmitLogin);

        li.appendChild(form);

        ul.appendChild(li);

        loginLogout.appendChild(button);
        loginLogout.appendChild(ul);

        buttonSubmitLogin.addEventListener("click", async () => {
            var inputEmail = document.getElementById("emailInput").value;
            var inputPassword = document.getElementById("passwordInput").value;
            var users = JSON.parse(localStorage.users);
            
            const user = users.filter(users => users.email === inputEmail);
            console.log(user);

            //Comprueba si se ha introducido un usuario existente en el listado de usuarios y si no es así, avisa al usuario
            if(user.length === 0)
            {
                alert("El usuario no existe. Por favor, introduzca sus datos de usuario de inicio de sesión correctamente.");
            }
            else
            {
                //Comprueba si la contraseña es correcta para el usuario introducido y si es así, inicia sesión
                if(user[0].password === inputPassword)
                {
                    sessionStorage.setItem('email', inputEmail);
                    sessionStorage.setItem('role', user[0].role);
                    location.reload();
                }
                //Comprueba si la contraseña es correcta para el usuario introducido y si no es así, avisa al usuario
                else
                {
                    alert("Su contraseña es incorrecta. Por favor, introduzca correctamente su contraseña.");
                }
            }
        });

    }
    //Si se ha iniciado sesión, se establece un botón para poder cerrar sesión
    else
    {
        button.innerHTML = "Logout";
        button.type = "button";
        button.id = "logout";
        button.classList.add("btn");
        button.classList.add("btn-outline-secondary");
        button.style.textAlign = "center";
        li.appendChild(button);
        loginLogout.appendChild(li);

        button.addEventListener("click", async() => {
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('role');
            location.reload();
        });

    }
}

//Permite mostrar y ocultar el menú del dropdown del login de manera suave
$("#login").click(function() {
    $("#dropdown-menu").toggle("slow", "linear", function() {
    });
});

//Muestra u oculta la barra de navegación dependiendo del estado anterior
function showNavbarSmall()
{
    var show = JSON.parse(localStorage.showNavbarSmall);
    var navbar = document.getElementById("navbar");
    //Si es la primera vez que se ejecuta, se muestra la barra de navegación
    if(show === undefined || show === null)
    {
        navbar.classList.add("show");
        show = true;
    }
    else
    {
        //Si se estaba ocultando, ahora se muestra la barra de navegación
        if(show === false)
        {
            navbar.classList.add("show");
            show = true;
        }
        //Si se estaba mostrando, ahora se oculta la barra de navegación
        else
        {
            navbar.classList.remove("show");
            show = false;
        }
    }
    localStorage.setItem("showNavbarSmall", show);

}