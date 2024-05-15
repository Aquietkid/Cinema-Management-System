const express = require('express');
const router = express.Router();
const connection = require("../config/persistence");

router.post('/newSchedule/:date/:slot1id/:slot2id', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const slot1id = parseInt(req.params.slot1id);
        const slot2id = parseInt(req.params.slot2id);
        const date = req.params.date;

        if (slot1id > 0) {
            const Starttime1 = date + ' 17:00:00';
            const EndTime1 = date + ' 20:00:00';
            var sql = 'INSERT INTO Showtime (MovieID, Starttime, EndTime) VALUES (?, ?, ?);';
            connection.query(sql, [slot1id, Starttime1, EndTime1], function (err, result) {
                if (err) throw err;
            });
        }

        if (slot2id > 0) {
            const Starttime2 = date + ' 22:00:00';
            const EndTime2 = date + ' 01:00:00';

            var sql = 'INSERT INTO Showtime (MovieID, Starttime, EndTime) VALUES (?, ?,? );';// + 
            connection.query(sql, [slot2id, Starttime2, EndTime2], function (err, result) {
                if (err) throw err;
            });
        }
        
        res.status(201).json({
            message: "Films scheduled!",
            data: result
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