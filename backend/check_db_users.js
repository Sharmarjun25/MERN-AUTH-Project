const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const UserModel = require('./Models/Users');

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        const users = await UserModel.find({});
        console.log("\n--- All Registered Users ---");
        if (users.length === 0) {
            console.log("No users found.");
        } else {
            users.forEach((user, index) => {
                console.log(`${index + 1}. Name: ${user.name}, Email: ${user.email}`);
            });
        }
        console.log("----------------------------\n");

        await mongoose.connection.close();
    } catch (err) {
        console.error("Error:", err);
    }
};

checkUsers();
