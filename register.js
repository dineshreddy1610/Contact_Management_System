document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const messageEl = document.getElementById("message") || document.createElement("p");
    messageEl.id = "message";
    this.appendChild(messageEl);

    if(password !== confirmPassword) {
        messageEl.innerText = "Passwords do not match!";
        messageEl.style.color = "red";
        return;
    }

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name, email })
    })
    .then(res => res.json())
    .then(response => {
        messageEl.innerText = response.message;
        messageEl.style.color = "green";
        if(response.message === "User registered successfully") {
            this.reset();
            // Redirect to login after 1s
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        }
    })
    .catch(err => {
        messageEl.innerText = "Error connecting to server";
        messageEl.style.color = "red";
        console.catch(err);
    });
});