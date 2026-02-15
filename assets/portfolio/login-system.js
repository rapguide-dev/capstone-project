// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- REGISTRATION LOGIC ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email').value;

            // Simple "Database" check
            if (localStorage.getItem(username)) {
                alert("Username already exists!");
            } else {
                const userData = { username, password, email };
                localStorage.setItem(username, JSON.stringify(userData));
                alert("Registration Successful!");
                window.location.href = "profile-login.html"; // Redirect to login
            }
        });
    }

    // --- LOGIN LOGIC ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const storedData = localStorage.getItem(username);
            if (storedData) {
                const user = JSON.parse(storedData);
                if (user.password === password) {
                    alert("Welcome back, " + username + "!");
                    sessionStorage.setItem('isLoggedIn', 'true');
                    window.location.href = "../../index.html"; // Go to main page
                } else {
                    alert("Incorrect password!");
                }
            } else {
                alert("User not found!");
            }
        });
    }
});
