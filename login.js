const username = document.getElementById("username");
const password = document.getElementById("password");

document.getElementById("btn-login").addEventListener("click", () => {

    if (username.value === "admin" && password.value === "admin123") {
        window.location.href = "./index.html";
    } else {
        alert("Invalid username or password");
    }

});