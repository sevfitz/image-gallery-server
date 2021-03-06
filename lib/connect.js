/* eslint no-console: "off" */
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cutebunnies';

mongoose.connect(dbUri);

// CONNECTION EVENTS
// when successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbUri);
});

// if the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connction error: ' + err);
});

// when the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// if the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log( 'Mongoose default connection disconnected through app termination' );
        process.exit(0);
    });
});