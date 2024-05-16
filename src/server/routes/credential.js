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
            else if (result.length == 0) {
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

router.get('/loginAdmin/:username/:password', (req, res) => {

    connection.connect(function (err) {
        if (err) throw err;
        const username = req.params.username;
        const password = req.params.password;

        var sql = 'SELECT * FROM Employee WHERE username=? AND password = ?;';
        connection.query(sql, [username, password], function (err, result) {
            if (err) throw err;
            else if (result.length == 0) {
                res.status(404).json({
                    message: "Not found",
                    loggedIn: false
                })
            }
            else {
                if (result[0].Designation == 'admin') {
                    res.status(200).json({
                        message: "Logged in!",
                        loggedIn: true,
                        userID: result[0].EmployeeID
                    });
                }
                else {
                    res.status(404).json({
                        message: "Not found",
                        loggedIn: false
                    })
                }
            }
        });
    })
});

router.post('/createUser', (req, res) => {
    connection.connect(function (err) {
        username = req.body.username;
        email = req.body.email;
        password = req.body.password;

        var sql = 'INSERT INTO Customer (Name, Email, Password) VALUES (?, ?, ?);';
        connection.query(sql, [username, email, password], function (err, result) {
            if (err) throw err;
            else {
                res.status(201).json({
                    message: "success"
                });
            }
        });
    })
})


module.exports = router;