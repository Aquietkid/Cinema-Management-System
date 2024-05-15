const express = require('express');
const router = express.Router();
const connection = require("../config/persistence");

router.post('/newSchedule/:date/:slot1id/:slot2id', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const date = req.params.date;
        const slot1id = req.params.slot1id;
        const slot2id = req.params.slot2id;
        var sql = 'INSERT INTO ;'; 
        connection.query(sql, [movieName], function (err, result) {
            if (err) throw err;
            else if (result.length == 0) {
                return res.status(404).send('No film with such a name exists!');
            }
            else {
                res.status(201).json({
                    data: result,
                    message: "Film(s) with the matching name returned"
                });
            }
        });
    });

})

router.get('/:movieName', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const movieName = req.params.movieName;
        var sql = 'SELECT * FROM Movie WHERE Movie.Name LIKE ?;'; 
        connection.query(sql, [movieName], function (err, result) {
            if (err) throw err;
            else if (result.length == 0) {
                return res.status(404).send('No film with such a name exists!');
            }
            else {
                res.status(201).json({
                    data: result,
                    message: "Film(s) with the matching name returned"
                });
            }
        });
    });

})


module.exports = router;