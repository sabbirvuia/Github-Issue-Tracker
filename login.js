const username = document.getElementById("username");
const password = document.getElementById("password");
 console.log(username.value, password.value)

document.getElementById("btn-login").addEventListener('click', () =>{
    console.log(username, password)
    if(username === "admin" && password === "admin123"){
    window.location.href = "index.html"
}
})
