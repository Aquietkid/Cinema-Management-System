const express = require('express');
const router = express.Router();
const connection = require("../config/persistence");

router.get('/:movieName', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const name = req.params.movieName;
        var sql = 'SELECT * FROM Movie WHERE Movie.Name LIKE ?;'; 
        connection.query(sql, [name], function (err, result) {
            if (err) throw err;
            else if (result.length == 0) {
                return res.status(404).send('No product exists against given ID!');
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

router.get('/director/:dirName', (req, res) => {
    res.status.json({
        message: "movie name"
    });
})


router.get('/producer/:producerName', (req, res) => {
    res.status.json({
        message: "movie name"
    });
})

router.get('/genre/:genre', (req, res) => {
    res.status.json({
        message: "movie name"
    });
})



module.exports = router;