var MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = new express();
var url = "mongodb://imprint:montu123@ds127065.mlab.com:27065/imprint";

app.get('/', (request, response) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
    });    
});
