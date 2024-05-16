
function setMinDate() {
    // Get today's date
    var today = new Date().toISOString().split('T')[0];

    // Set the minimum date for the input field
    document.getElementById("FilmDate").setAttribute("min", today);
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
    const itemDropdown1 = document.getElementById('slot1');
    const itemDropdown2 = document.getElementById('slot2');

    // Clear existing options
    itemDropdown1.innerHTML = '';
    itemDropdown2.innerHTML = '';

    // Add default option
    const defaultOption1 = document.createElement('option');
    defaultOption1.value = '';
    defaultOption1.textContent = 'Select a movie to schedule';

    const empty1 = document.createElement('option');
    empty1.value = '0';
    empty1.textContent = 'None';

    const defaultOption2 = document.createElement('option');
    defaultOption2.value = '';
    defaultOption2.textContent = 'Select a movie to schedule';

    const empty2 = document.createElement('option');
    empty2.value = '0';
    empty2.textContent = 'None';

    itemDropdown1.appendChild(defaultOption1);
    itemDropdown2.appendChild(defaultOption2);
    itemDropdown1.appendChild(empty1);
    itemDropdown2.appendChild(empty2);

    films.forEach(film => {
        const option = document.createElement('option');
        option.value = film.MovieID; // Assuming each item has an ID property
        option.textContent = film.Name; // Assuming each item has a Name property

        const option2 = document.createElement('option');
        option2.value = film.MovieID; // Assuming each item has an ID property
        option2.textContent = film.Name; // Assuming each item has a Name property

        itemDropdown1.appendChild(option);
        itemDropdown2.appendChild(option2);
    });

}

async function scheduleFilms() {
    event.preventDefault();
    const date = document.getElementById('FilmDate').value;
    console.log(date);
    const id1 = document.getElementById('slot1').value;
    console.log(id1);
    const id2 = document.getElementById('slot2').value;
    console.log(id2);

    fetch(`http://localhost:20419/scheduleFilm/newSchedule/${date}/${id1}/${id2}`, {
        method: "POST"
    })
        .then(response => {
            alert('Film(s) scheduled!');
            location.reload();
        })
        .then(data => {
            console.log(data);
            // Populate the dropdown with items from the backend
        })
        .catch(error => {
            console.error('There was a problem fetching films:', error);
        });

}



document.getElementById('submit-button').addEventListener('click', scheduleFilms);
window.addEventListener(onload, fetchFilms());
document.getElementById("FilmDate").addEventListener(onload, setMinDate());


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