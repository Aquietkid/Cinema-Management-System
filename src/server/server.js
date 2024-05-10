const express = require('express');
const app = express();
const router = express.Router();
const cors = require("cors");
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});

//@Aquietkid add routes here
const api = require('./routes/api');
app.use('/api', api);

module.exports = router;