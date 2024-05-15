
function updateFilm() {
    event.preventDefault();
    // Get the selected movie ID from the dropdown
    const selectedItem = document.getElementById('film-selector').value;

    const filmName = document.getElementById('FilmName').value;
    const directorName = document.getElementById('DirectorName').value;
    const producerName = document.getElementById('ProducerName').value;
    const releaseDate = document.getElementById('ReleaseDate').value;
    const duration = document.getElementById('Duration').value;
    const description = document.getElementById('Description').value;

    const MovieID = selectedItem;
    console.log('MovieID' + MovieID);
    // Make a GET request to the backend API endpoint
    fetch(`http://localhost:20419/filmManagement/updateFilm/${MovieID}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            filmName: filmName,
            directorName: directorName,
            producerName: producerName,
            releaseDate: releaseDate,
            duration: duration,
            description: description
        })
    })
        .then(response => {
            // Check if the response is successful (status code 200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Display the quotation result on the HTML page
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
    defaultOption.textContent = 'Select a movie to update';
    itemDropdown.appendChild(defaultOption);

    films.forEach(film => {
        const option = document.createElement('option');
        option.value = film.MovieID; // Assuming each item has an ID property
        option.textContent = film.Name; // Assuming each item has a Name property
        itemDropdown.appendChild(option);
    });

}


window.addEventListener(onload, fetchFilms());

document.getElementById('update-film-button').addEventListener('click', updateFilm);


document.getElementById('film-selector').addEventListener('change', function() {
    const ID = document.getElementById('film-selector').value;
    fetch(`http://localhost:20419/filmManagement/film/${ID}`)
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
            const Film = data.data[0];
            document.getElementById('FilmName').value = Film.Name;
            document.getElementById('DirectorName').value = Film.Director;
            document.getElementById('ProducerName').value = Film.Producer;
            document.getElementById('ReleaseDate').value = Film.ReleaseDate;
            document.getElementById('Duration').value = parseInt(Film.Duration);
            document.getElementById('Description').value = Film.Description;
        })
        .catch(error => {
            console.error('There was a problem fetching films:', error);
        });
})