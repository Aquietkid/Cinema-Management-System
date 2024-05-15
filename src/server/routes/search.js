const express = require('express');
const router = express.Router();
const connection = require("../config/persistence");

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

router.get('/director/:directorName', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const directorName = '%' + req.params.directorName + '%';
        console.log(directorName);
        var sql = 'SELECT * FROM Movie WHERE Movie.Director LIKE ?;'; 
        connection.query(sql, [directorName], function (err, result) {
            if (err) throw err;
            else if (result.length == 0) {
                return res.status(404).send('No such director!');
            }
            else {
                res.status(200).json({
                    data: result,
                    message: "Film(s) with the matching director returned"
                });
            }
        });
    });
})


router.get('/producer/:producerName', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const producerName = '%' + req.params.producerName + '%';
        var sql = 'SELECT * FROM Movie WHERE Movie.Producer LIKE ?;'; 
        connection.query(sql, [producerName], function (err, result) {
            if (err) throw err;
            else if (result.length == 0) {
                return res.status(404).send('No such producer!');
            }
            else {
                res.status(200).json({
                    data: result,
                    message: "Film(s) with the matching producer returned"
                });
            }
        });
    });
})

router.get('/description/:keyword', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        const keyword = '%' + req.params.keyword + '%';
        var sql = 'SELECT * FROM Movie WHERE Movie.Description LIKE ?;'; 
        connection.query(sql, [keyword], function (err, result) {
            if (err) throw err;
            else if (result.length == 0) {
                return res.status(404).send('No such film found!');
            }
            else {
                res.status(200).json({
                    data: result,
                    message: "Film(s) with the matching description returned"
                });
            }
        });
    });
})



module.exports = router;