const mongoose = require('mongoose');

exports.connectToDatabase = async () => {
    try {

        await mongoose.connect(process.env.DB_CONNECTION)
        console.log('Connected to Database');
    } catch (error) {
        console.log(error);
    }
}