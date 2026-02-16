document.addEventListener('DOMContentLoaded', () => {
    // --- 1. REGISTRATION PAGE LOGIC ---
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page from refreshing

            // Collect User Data
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email').value;

            // Check if user already exists
            if (localStorage.getItem(username)) {
                alert("This username is already taken. Try another one!");
                return;
            }

            // The "Only Letters" Algorithm (Regular Expression)
            // ^ = start, [A-Za-z] = letters only, + = one or more, $ = end
            const letterOnlyRegex = /^[A-Za-z]+$/;

            // 1. Check for symbols or numbers
            if (!letterOnlyRegex.test(password)) {
                alert("Invalid Password! Numbers and symbols are not allowed.");
            return; // Stop the registration
        }

            // 2. Check length (just in case)
            if (password.length > 12) {
                alert("Password is too long! Maximum 12 characters.");
            return;
        }

        // If it passes both, proceed to save...
        const userData = { username, password, email };
        localStorage.setItem(username, JSON.stringify(userData));
    
        alert("Success! Redirecting to login...");
        window.location.href = "profile-login.html";
    });
}

    // --- 2. LOGIN PAGE LOGIC ---
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            // Fetch user from storage
            const storedUser = localStorage.getItem(usernameInput);

            if (storedUser) {
                const user = JSON.parse(storedUser);

                // Verify Password
                if (user.password === passwordInput) {
                    // Start a Session
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('currentUser', user.username);

                    alert("Welcome, " + user.username + "!");
                    window.location.href = "../../index.html"; // Go to main landing page
                } else {
                    alert("Incorrect password. Please try again.");
                }
            } else {
                alert("Account not found. Please sign up first.");
            }
        });
    }
});

