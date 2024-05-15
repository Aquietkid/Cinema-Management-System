document.getElementById('search-button').addEventListener('click', searchFilm);


async function searchFilm() {
    event.preventDefault();
    const filmName = document.getElementById('search-bar').value;
    console.log(filmName);
    try {
        const response = await fetch(`http://localhost:20419/search/${filmName}`);
        // console.log(filmName);
        if(response) {
            const data = await response.json();
            console.log(data);
        }
        return;
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}
