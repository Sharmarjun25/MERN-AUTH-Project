const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URI;
console.log("DB file is running");

mongoose.connect(mongo_url)
.then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log('MongoDB connection failed: ' , err);
})