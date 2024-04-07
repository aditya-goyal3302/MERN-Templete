const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        
        mongoose.connection
        .on('error', (err) => {
            console.log('Mongoose connecting error !!!!', err);
            // throw new Error(err);
        })
        .on('reconnected', () => {
            console.log('Mongoose is reconnected!!!!');
        })
        .on('reconnectFailed', () => {
            console.log('Mongoose reconnectFailed!!!!');
        })
        .on('connecting', () => {
            console.log('Mongoose connecting!!!!');
        })
        .on('disconnecting', () => {
            console.log('Mongoose disconnecting!!!!');
        })
        .on('connected', () => {
            console.log('Mongoose is connected!!!!');
        })
        .on('disconnected', () => {
            console.log('Mongoose is disconnected!!!!');
        })
        .on('close', () => {
            console.log('Mongoose close!!!!');
        })
        
        await mongoose.connect(`${process.env.DB_CONNECT}linked_in`);
        
    } catch (err) {
        console.log(`Error_in_db: ${err.message}`);
        // process.exit(1);
    }
}
// connectDB();
// exports db
module.exports = { connectDB };
