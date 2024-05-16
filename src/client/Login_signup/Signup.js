async function signup() {
    event.preventDefault();
    const username = document.getElementById('uname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;

    fetch(`http://localhost:20419/credential/createUser`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
        .then(response => {
            alert('Account created!');
            // return response.json();
        })
        .then(data => {
            window.location.href = './Login.html';
        })
        .catch(error => {
            console.error('There was a problem creating your account:', error);
        });
}

document.getElementById('signup-btn').addEventListener('click', signup);