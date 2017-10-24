var MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = new express();
var url = "mongodb://imprint:montu123@ds127065.mlab.com:27065/imprint";

app.set('port', (process.env.PORT || 5000));

app.get('/', (request, response) => {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('ERROR');
        }
        else {
            console.log("Database Connected!");
            db.close();
        }
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});