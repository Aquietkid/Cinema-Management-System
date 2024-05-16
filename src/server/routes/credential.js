const express = require('express');
const router = express.Router();
const connection = require("../config/persistence");

router.get('/loginUser/:username/:password', (req, res) => {

    connection.connect(function (err) {
        if (err) throw err;
        const username = req.params.username;
        const password = req.params.password;

        var sql = 'SELECT * FROM Customer WHERE Email=? AND Password = ?;';
        connection.query(sql, [username, password], function (err, result) {
            if (err) throw err;
            else if(result.length == 0) {
                res.status(404).json({
                    message: "Not found", 
                    loggedIn: false
                })
            }
            else {
                res.status(200).json({
                    message: "Logged in!", 
                    loggedIn: true, 
                    userID: result[0].CustomerID
                });
            }
        });
    })
});


module.exports = router;