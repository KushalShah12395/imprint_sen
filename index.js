var MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = new express();
var url = "mongodb://imprint:montu123@ds127065.mlab.com:27065/imprint";

app.set('port', (process.env.PORT || 5000));

app.get('/montu', (request, response) => {
    // MongoClient.connect(url, function (err, db) {
    //     if (err) {
    //         console.log('ERROR');
    //     }
    //     else {
    //         response.send({
    //             name: 'Montu Thakore',
    //             age: 22,
    //             university: 'DAIICT',
    //         });
    //     }
    // });
    MongoClient.connect(url,(err, db) => {
        if(err) {
            return console.log('Unable To Connect To Mongodb Server');
        }
        console.log('****Connected TO Mongodb Server****');
        
        db.collection('todos').insertOne({
            text : 'Something Todo',
            completed : false
        }, (err, result) => {
            if(err)
                return console.log('Error To Insert Into Document..', err);
            console.log(JSON.stringify(result.ops,undefined,2));
        });
        db.collection('users').insertOne({
            name : 'MONTU THAKORE',
            age : 22,
            location : 'GOPPIPURA'
        }, (err, result) => {
            if(err)
                return console.log('Error To Insert Into Document..', err);
            console.log(JSON.stringify(result.ops,undefined,2));
            console.log(result.ops[0]._id.getTimestamp());
        });
    
        db.close();
        console.log('****Connection Close****');
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});