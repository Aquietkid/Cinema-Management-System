
async function addReview() {
    event.preventDefault();
    // var MovieID = document.getElementById('film-selector').value;
    var CustomerID = parseInt(window.localStorage.getItem('userID'));
    // if(!CustomerID) CustomerID = 0;
    var Rating = getStars();
    console.log('starnum' + Rating);
    var Review = document.getElementById('comment').value;

    // fetch(`http://localhost:20419/review/addReview`, {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         MovieID: MovieID,
    //         CustomerID: CustomerID,
    //         Rating: Rating,
    //         Review: Review
    //     })
    // })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(error => {
    //         console.error('There was a problem posting your review:', error);
    //     });
}

document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to the submit review button
    document.getElementById('btn-submit-review').addEventListener('click', async function () {
        var MovieID = document.getElementById('movieName').value;
        var CustomerID = '0';
        var Rating = getSelectedStars();
        console.log('Number of stars selected:', Rating);
        var Review = document.getElementById('comment').value;

        fetch(`http://localhost:20419/review/addReview`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                MovieID: MovieID,
                CustomerID: CustomerID,
                Rating: Rating,
                Review: Review
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert('Review added!');
                location.reload();
                return response.json();
            })
            .catch(error => {
                console.error('There was a problem posting your review:', error);
            });
    });
});

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
    const itemDropdown1 = document.getElementById('movieName');

    // Clear existing options
    itemDropdown1.innerHTML = '';

    // Add default option
    const defaultOption1 = document.createElement('option');
    defaultOption1.value = '';
    defaultOption1.textContent = 'Select a movie';

    itemDropdown1.appendChild(defaultOption1);

    films.forEach(film => {
        const option = document.createElement('option');
        option.value = film.MovieID; // Assuming each item has an ID property
        option.textContent = film.Name; // Assuming each item has a Name property

        itemDropdown1.appendChild(option);
    });

}

// Function to get the number of stars selected
function getSelectedStars() {
    // Get all the star radio buttons
    const stars = document.getElementsByName('rating');
    let selectedStars = 0;

    // Iterate through the radio buttons to find the selected one
    for (const star of stars) {
        if (star.checked) {
            selectedStars = star.value;
            break;
        }
    }

    return selectedStars;
}

function fetchReviews() {
    fetch('http://localhost:20419/review/allReviews')
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
    var filmTable = document.getElementById('reviewsTable');

    // Clear existing options
    // RatingID, MovieID, CustomerID, RatingStars, Review
    filmTable.innerHTML = `
    <thead class="text-warning">
        <tr>
            <th scope="col">MovieName</th>
            <th scope="col">RatingStars</th>
            <th scope="col">Review</th>
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
            <td>${film.Name}</td>
            <td>${film.RatingStars}</td>
            <td>${film.Review}</td>
        `;
    });

    filmTable.innerHTML += '</tbody>';


}

window.addEventListener(onload, fetchFilms());
window.addEventListener(onload, fetchReviews());