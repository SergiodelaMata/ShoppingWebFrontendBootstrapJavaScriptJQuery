adminSections();
statusLogin();

function adminSections(){
    var userEmail = sessionStorage.getItem('email');
    var userRole = sessionStorage.getItem('role');

    if(userEmail !== "" && userEmail !== null && userEmail !== undefined && userRole === "admin")
    {
        var liNewCategory = document.getElementById("newCategory");
        liNewCategory.classList.add("nav-item");
        liNewCategory.style.textAlign = "center";

        var newCategoryButton = document.createElement("a");
        newCategoryButton.classList.add("nav-link");
        newCategoryButton.href = "/newCategory.html";
        newCategoryButton.innerText = "Nueva categoría";
        liNewCategory.appendChild(newCategoryButton);

        var liNewProduct = document.getElementById("newProduct");
        liNewProduct.classList.add("nav-item");
        liNewProduct.style.textAlign = "center";

        var newProductButton = document.createElement("a");
        newProductButton.classList.add("nav-link");
        newProductButton.href = "/newProduct.html";
        newProductButton.innerText = "Nuevo producto";
        liNewProduct.appendChild(newProductButton);
    }
}

function statusLogin(){
    var userEmail = sessionStorage.getItem('email');
    var loginLogout = document.getElementById("loginlogout");
    var li = document.createElement("li");
    var button = document.createElement("button");
    

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
        button.setAttribute("data-toggle", "dropdown");

        var ul = document.createElement("ul");
        ul.id = "dropdown-menu";
        ul.classList.add("dropdown-menu");
        ul.classList.add("dropdown-menu-right");
        ul.classList.add("mt-2");

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

            if(user.length === 0)
            {
                alert("El usuario no existe. Por favor, introduzca sus datos de usuario de inicio de sesión correctamente.");
            }
            else
            {
                if(user[0].password === inputPassword)
                {
                    sessionStorage.setItem('email', inputEmail);
                    sessionStorage.setItem('role', user[0].role);
                    location.reload();
                }
                else
                {
                    alert("Su contraseña es incorrecta. Por favor, introduzca correctamente su contraseña.");
                }
            }
        });

    }
    else
    {
        button.innerHTML = "Logout";
        button.type = "button";
        button.id = "logout";
        button.classList.add("btn");
        button.classList.add("btn-outline-secondary");
        li.appendChild(button);
        loginLogout.appendChild(li);

        button.addEventListener("click", async() => {
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('role');
            location.reload();
        });

    }
}

$("#login").click(function() {
    $("#dropdown-menu").toggle("slow", "linear", function() {
    });
});
