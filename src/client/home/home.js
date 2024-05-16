
document.getElementById('search-button').addEventListener('click', searchFilm);

async function searchFilm(event) {
    event.preventDefault();
    const filmName = document.getElementById('search-bar').value;
    const carouselElement = document.getElementById('carouselExampleAutoplaying');
    const resultsContainer = document.getElementById('results-container');

    // Hide the carousel
    carouselElement.style.display = 'none';

    try {
        const response = await fetch(`http://localhost:20419/search/${filmName}`);
        if (response.ok) {
            const movie = await response.json(); // The server returns a single movie object

            if (movie.data.length === 0) {
                // Film does not exist
                alert('Film does not exist!');
            } else {
                // Film exists, display it in table format
                const table = createTable(movie.data); // Pass the first movie object to createTable
                resultsContainer.innerHTML = '';
                resultsContainer.appendChild(table);
            }
        } else {
            // Server returned an error
            alert('Error fetching movie. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching items:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
}

function createTable(movies) {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped'); // Added Bootstrap class for styling

    // Add table headers
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headers = ['MovieID', 'Name', 'Director', 'Description', 'Duration', 'Producer', 'Release Date'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });


    // Helper function to safely retrieve property values
    function safeText(content) {
        return content ? content : 'N/A'; // If content is undefined or null, return 'N/A'
    }

    // Helper function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
    }

    movies.forEach(movie => {
        // Add a row with the movie details
        var tbody = table.createTBody();
        var row = tbody.insertRow();

        // Inserting cells with safeText to handle undefined or null values
        const movieIdCell = row.insertCell();
        movieIdCell.textContent = safeText(movie.MovieID);

        const nameCell = row.insertCell();
        nameCell.textContent = safeText(movie.Name);

        const directorCell = row.insertCell();
        directorCell.textContent = safeText(movie.Director);

        const descriptionCell = row.insertCell();
        descriptionCell.textContent = safeText(movie.Description);

        const durationCell = row.insertCell();
        durationCell.textContent = safeText(movie.Duration);

        const producerCell = row.insertCell();
        producerCell.textContent = safeText(movie.Producer);

        const releaseDateCell = row.insertCell();
        releaseDateCell.textContent = formatDate(movie.ReleaseDate);
    });

    return table;
}
