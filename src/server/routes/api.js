const express = require('express')
const router = express.Router()

router.get('/getFromAPI', (req, res) => {
    res.status(201).json({
        "message": "success"
    });
})


module.exports = router;