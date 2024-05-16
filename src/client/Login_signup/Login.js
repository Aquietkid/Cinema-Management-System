
async function login() {
    event.preventDefault();
    const username = document.getElementById('uname-txt').value;
    const password = document.getElementById('pwd-txt').value;

    fetch(`http://localhost:20419/credential/loginUser/${username}/${password}`)
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            window.localStorage.setItem('userID', data.userID);
            sessionStorage.setItem('navigationFlag', true);
            window.location.href = '../home/home.html';
            // console.log('userID' + window.sessionStorage.getItem('userID'));
        })
        .catch(error => {
            console.error('There was a problem logging in:', error);
        });

        fetch(`http://localhost:20419/credential/loginAdmin/${username}/${password}`)
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            window.localStorage.setItem('userID', data.userID);
            sessionStorage.setItem('navigationFlag', true);
            window.location.href = '../Admin_Dashboard/admin_dashboard.html';
            // console.log('userID' + window.sessionStorage.getItem('userID'));
        })
        .catch(error => {
            console.error('There was a problem logging in:', error);
        });

        alert('Incorrect credentials!');

}

document.getElementById('login-btn').addEventListener('click', login);

// Set a flag in sessionStorage to indicate navigation within the site
window.addEventListener('beforeunload', function (event) {
    // Mark session as active
    sessionStorage.setItem('navigationFlag', 'true');
  });
  
  // Handle window unload event
  window.addEventListener('unload', function (event) {
    // Check if the sessionStorage flag exists
    if (!sessionStorage.getItem('navigationFlag')) {
      // If the flag doesn't exist, clear the local storage
      localStorage.clear();
    } else {
      // If the flag exists, remove it for future navigations
      sessionStorage.removeItem('navigationFlag');
    }
  });
  