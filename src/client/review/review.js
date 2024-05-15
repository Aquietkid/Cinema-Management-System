
async function addReview() {

    var MovieID = document.getElementById('film-selector').value;
    var CustomerID = 'john.doe';
    var Rating = () => {
        var starNum = 1;
        for (starNum = 1; starNum <= 5; starNum++) {
            var id = 'star' + toString(starNum);
            var star = document.getElementById(id);
            if (!star.checked) break;
        }
        console.log(starNum);
        return starNum;
    }
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
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem posting your review:', error);
        });
}