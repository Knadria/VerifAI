document.addEventListener("DOMContentLoaded", function () {
    const registerBtn = document.getElementById("registerBtn");
    const usernameInput = document.getElementById("reg-username");
    const passwordInput = document.getElementById("reg-password");
    const confirmPasswordInput = document.getElementById("reg-confirm");

    registerBtn.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default form submission

        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!username || !password || !confirmPassword) {
            alert("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const userData = {
            username: username,
            password: password
        };

        localStorage.setItem("registeredUser", JSON.stringify(userData));
        alert("Account created successfully!");

        // Optional: Clear inputs
        usernameInput.value = "";
        passwordInput.value = "";
        confirmPasswordInput.value = "";

        // Redirect to login page after successful registration
        window.location.href = "../HTML/LoginPage.html";
    });
});
