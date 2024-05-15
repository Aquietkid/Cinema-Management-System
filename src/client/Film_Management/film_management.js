function addFilm() {
	// const button = document.getElementById('add-film-button');
	event.preventDefault();

	const filmName = document.getElementById('FilmName').value;
	const directorName = document.getElementById('DirectorName').value;
	const producerName = document.getElementById('ProducerName').value;
	const releaseDate = document.getElementById('ReleaseDate').value;
	const duration = document.getElementById('Duration').value;
	const description = document.getElementById('Description').value;

	fetch("http://localhost:20419/filmManagement/addFilm", {
		method: "POST",
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
		.then(response =>{
			if(!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			console.log(response);
		})
		.catch(err => console.log(err));
}

/////////////////////////////////////
function fetchFilms() {
    fetch('http://localhost:20419/supplier/all/itemsfilmManagement/allFilms')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // console.log('Above return response.json()', response);
            return response.json();
        })
        .then(data => {
            // console.log(data);
            // Populate the dropdown with items from the backend
            populateDropdown(data);
        })
        .catch(error => {
            console.error('There was a problem fetching films:', error);
        });
}

// Function to populate the dropdown with items
function populateDropdown(items) {
    const itemDropdown = document.getElementById('film-selector');

    // Clear existing options
    itemDropdown.innerHTML = '';

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a film to update';
    itemDropdown.appendChild(defaultOption);

    // Add options for each item
    items.forEach(film => {
        const option = document.createElement('option');
        option.value = film.MovieID; // Assuming each item has an ID property
        option.textContent = film.Name; // Assuming each item has a Name property
        itemDropdown.appendChild(option);
    });
}


window.addEventListener(onload, fetchFilms());

document.getElementById('add-film-button').addEventListener('click', addFilm);