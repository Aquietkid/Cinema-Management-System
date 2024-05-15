const express = require('express');
const router = express.Router();
const connection = require("../config/persistence");

router.post('/addReview', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
        var MovieID = req.body.MovieID;
        var CustomerID = req.body.CustomerID;
        var Rating = req.body.Rating;
        var Review = req.body.Review;

        var sql = 'INSERT INTO Rating (MovieID, CustomerID, RatingStars, Review) VALUES (?, ?, ?, ?) ;';
        connection.query(sql, [MovieID, CustomerID, Rating, Review], function (err, result) {
            if (err) throw err;
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