const mongoose = require('mongoose');
const dotenv = require('dotenv');

const dbConnection = async () => {
    try {
        const dbConn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connection Successfull ${dbConn.connection.host}`)   
    } catch (error) {
        console.log(`Following Error occured in MongoDB connection: ${error}`)
    }
};

module.exports = dbConnection;