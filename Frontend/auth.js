function toggleAuth(){
    document.getElementById("login-form").classList.toggle("hidden");
    document.getElementById("register-form").classList.toggle("hidden");
    document.getElementById("error-msg").textContent = "";
}

async function handleLogin(){
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try{
        const data = await ApiService.login(email, password);

        localStorage.setItem("vocab_user", JSON.stringify({
            userId : data.userId,
            username : data.username,
        }));
        window.location.href = "index.html";
    
    }catch(error){
        document.getElementById("error-msg").textContent = "Login Failed: " + error.message;
    }
}


async function handleRegister(){
    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    try{
        const data = await ApiService.register(username, email, password);

        // basarili register varsa direkt login
        localStorage.setItem("vocab_user", JSON.stringify({
            userId : data.userId,
            username : data.username,
        }));

        window.location.href = "index.html";
    
    }catch(error){
        document.getElementById("error-msg").textContent = "Registration Failed: " + error.message;
    }
}