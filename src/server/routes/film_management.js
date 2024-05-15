const express = require('express');
const router = express.Router();
const connection = require("../config/persistence");

router.post('/addFilm', (req, res) => {
    connection.connect(function (err) {

        const filmName = req.body.filmName;
        const directorName = req.body.directorName;
        const producerName = req.body.producerName;
        const releaseDate = req.body.releaseDate;
        const duration = req.body.duration;
        const description = req.body.description;

        if (err) throw err;
        const movieName = req.params.movieName;
        var sql = 'INSERT INTO Movie (Name, Director, Producer, ReleaseDate, Description, Duration) VALUES (?,?,?,DATE(?),?,?);';
        connection.query(sql, [filmName, directorName, producerName, releaseDate, duration, description], function (err, result) {
            if (err) throw err;
            else {
                res.status(201).json({
                    data: result,
                    message: "Film added successfully!"
                });
            }
        });
    });
})


router.get('/allFilms', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        var sql = 'SELECT MovieID, Name FROM Movie;';
        connection.query(sql, function (err, result) {
            if (err) throw err;
            else if(result.length == 0) {
                res.status(404).json({
                    message: "no films"
                });
            }
            else {
                res.status(200).json({
                    data: result,
                    message: "All films returned!"
                });
            }
        });
    });
})

module.exports = router;