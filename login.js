const username = document.getElementById("username");
const password = document.getElementById("password");

const singIn = document.getElementById("signin");
const loggingIn = document.getElementById("loggingin");

document.getElementById("btn-login").addEventListener("click", () => {

    if (username.value === "admin" && password.value === "admin123") {
        singIn.classList.add("hidden");
        loggingIn.classList.remove("hidden")

        setTimeout(()=>{
        
        window.location.href = "./home.html";
        }, 1000)

    } else {
        alert("Invalid username or password");
    }

});