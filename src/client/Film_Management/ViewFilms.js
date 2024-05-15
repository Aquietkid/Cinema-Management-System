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
            populateTable(data.data);
        })
        .catch(error => {
            console.error('There was a problem fetching films:', error);
        });
}

// Function to populate the dropdown with items
function populateTable(films) {
    var filmTable = document.getElementById('filmsTable');

    // Clear existing options
    filmTable.innerHTML = `
    <thead class="text-warning">
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Director</th>
            <th scope="col">Producer</th>
            <th scope="col">Duration</th>
            <th scope="col">Description</th>
            <th scope="col">Released in</th>
        </tr>
        </thead>
        <tbody>
    `;

    // Add default option
    // const defaultOption = document.createElement('option');
    // defaultOption.value = '';
    // defaultOption.textContent = 'Select a movie to update';
    // itemDropdown.appendChild(defaultOption);

    var ii = 1
    films.forEach(film => {
        // const option = document.create('option');
        // filmTable.append(option);
        
        var newRow = filmTable.insertRow(ii++);
        newRow.innerHTML = `
            <td>${film.MovieID}</td>
            <td>${film.Name}</td>
            <td>${film.Director}</td>
            <td>${film.Producer}</td>
            <td>${film.Duration}</td>
            <td>${film.Description}</td>
            <td>${film.ReleaseDate}</td>
        `;
    });

    filmTable.innerHTML += '</tbody>';

}

window.addEventListener(onload, fetchFilms());