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
        connection.query(sql, [filmName, directorName, producerName, releaseDate, description, duration], function (err, result) {
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
        var sql = 'SELECT * FROM Movie;';
        connection.query(sql, function (err, result) {
            if (err) throw err;
            else if (result.length == 0) {
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

router.get('/film/:id', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const ID = req.params.id
        var sql = 'SELECT * FROM Movie WHERE MovieID = ?;';
        connection.query(sql, [ID], function (err, result) {
            if (err) throw err;
            else if (result.length == 0) {
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

router.put('/updateFilm/:id', (req, res) => {
    console.log('API called');
    connection.connect(function (err) {
        if (err) throw err;

        const ID = parseInt(req.params.id);
        const filmName = req.body.filmName;
        const directorName = req.body.directorName;
        const producerName = req.body.producerName;
        const releaseDate = req.body.releaseDate;
        const duration = req.body.duration;
        const description = req.body.description;

        var sql = 'UPDATE Movie SET '
            + 'Name = ?, '
            + 'Director = ?, '
            + 'Producer = ?, '
            + 'ReleaseDate = DATE(?), ' 
            + 'Duration = ?, ' 
            + 'Description = ? ' 
            + 'WHERE MovieID = ?;';
        connection.query(sql, [filmName, directorName, producerName, releaseDate, duration, description, ID], function (err, result) {
            if (err) throw err;
            else {
                res.status(204).json({
                    data: result,
                    message: "Film updated successfully!"
                });
            }
        });

    })
})

router.delete('/deleteFilm/:id', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const ID = req.params.id
        var sql = 'DELETE FROM Movie WHERE MovieID = ?;';
        connection.query(sql, [ID], function (err, result) {
            if (err) throw err;
            else {
                res.status(200).json({
                    data: result,
                    message: "Film deleted!"
                });
            }
        });
    });
})

module.exports = router;