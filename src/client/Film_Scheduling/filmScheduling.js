
function setMinDate() {
    // Get today's date
    var today = new Date().toISOString().split('T')[0];
    
    // Set the minimum date for the input field
    document.getElementById("FilmDate").setAttribute("min", today);
}


document.getElementById("FilmDate").addEventListener(onload, setMinDate());