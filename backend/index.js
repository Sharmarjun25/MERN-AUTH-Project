const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

const cors = require('cors');
console.log("Main file is running");
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;


app.get("/", (req, res) => {
    res.send("Backend is running");
})

app.use(bodyParser.json());
app.use(cors()); //use to allow request coming from port 3000 to port 8080

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    //console.log("Main file is running");
})