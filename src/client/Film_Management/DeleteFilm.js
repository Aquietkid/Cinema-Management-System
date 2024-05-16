function deleteFilm() {
    event.preventDefault();
    // Get the selected movie ID from the dropdown
    const MovieID = document.getElementById('film-selector').value;

    fetch(`http://localhost:20419/filmManagement/deleteFilm/${MovieID}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            // Check if the response is successful (status code 200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            alert('Film deleted!');
            location.reload();
            return response.json();
        })
        .then(data => {
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
            // Display an error message on the HTML page
        });
}


function fetchFilms() {
    fetch('http://localhost:20419/filmManagement/allFilms')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // console.log('Above return response.json()', response);
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Populate the dropdown with items from the backend
            populateDropdown(data.data);
        })
        .catch(error => {
            console.error('There was a problem fetching films:', error);
        });
}

// Function to populate the dropdown with items
function populateDropdown(films) {
    const itemDropdown = document.getElementById('film-selector');

    // Clear existing options
    itemDropdown.innerHTML = '';

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a movie to delete';
    itemDropdown.appendChild(defaultOption);

    films.forEach(film => {
        const option = document.createElement('option');
        option.value = film.MovieID; // Assuming each item has an ID property
        option.textContent = film.Name; // Assuming each item has a Name property
        itemDropdown.appendChild(option);
    });

}


window.addEventListener(onload, fetchFilms());

document.getElementById('delete-button').addEventListener('click', deleteFilm);