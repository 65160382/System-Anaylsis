document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username-display').textContent = username;
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Save username, Customer_id, and Register_id to localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('Customer_id', data.Customer_id);
            localStorage.setItem('Register_id', data.Register_id);
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});



