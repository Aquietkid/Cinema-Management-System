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
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			alert('Film added!');
			location.reload();
			return response.json();
		})
		.then(data => {
			console.log(response);
		})
		.catch(err => console.log(err));
}


document.getElementById('add-film-button').addEventListener('click', addFilm);