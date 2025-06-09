document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const usernameInput = document.getElementById("login-username");
    const passwordInput = document.getElementById("login-password");

    loginBtn.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent form default submission

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

        if (!storedUser) {
            alert("No account found. Please register first.");
            return;
        }

        if (username === storedUser.username && password === storedUser.password) {
            alert("Login successful!");

            // Redirect after successful login
            window.location.href = "../HTML/MainPage.html";
        } else {
            alert("Invalid username or password.");
        }
    });
});
