var MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = new express();
var bodyParser = require('body-parser');
var url = "mongodb://imprint:montu123@ds127065.mlab.com:27065/imprint";
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('port', (process.env.PORT || 5000));

app.post('/api/user_registration', urlencodedParser, (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    var email = undefined;
    var password = undefined;
    var cpassword = undefined;

    if(request.body.email)
        email = request.body.email;
    if(request.body.password)
        password = request.body.password;
    if(request.body.confirm_password)
        cpassword = request.body.confirm_password;

    if(email === undefined || password === undefined  || cpassword === undefined  ) {
        response.send({
            status_code: 400,
            msg: "Some fields are missing"
        });
    }

    MongoClient.connect(url, function (err, db) {
        if (err) {
            response.send({
                status_code: 500,
                msg: "can't connect to the mongodb"
            });
        }
        else {
            if(password===cpassword) {
                db.collection('User').insertOne({
                    "Email" : email,
                    "Password" : password
                }, (err, result) => {
                    response.send({
                        status_code: 500,
                        msg:"Error in insert"
                    });
                });
                response.send({
                    status_code:200,
                    msg:"Success"
                });
            }
            else {
                response.send({
                    status_code: 400,
                    msg:"Password and confirm password must match"
                });
            }
                        
        }
    });
});

app.post('/api/checkEmail', urlencodedParser, (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    var email = undefined;
    if(request.body.email)
        email = request.body.email;
    if(email === undefined) {
        response.send({
            status_code: 400,
            msg: "Email Field Missing"
        });
    }

    MongoClient.connect(url, function (err, db) {
        if (err) {
            response.send({
                status_code: 500,
                msg: "can't connect to the mongodb"
            });
        }
        else {
            db.collection('User').find({ Email: email }).count().then((count) => {
                if(count==1) {
                    response.send({
                        status_code: 200,
                        msg: "Email Found"
                    });
                }
                else {
                    response.send({
                        status_code: 404,
                        msg: "Email Not Found"
                    });
                }
            }, (err) => {
                response.send({
                    status_code: 400,
                    msg: "Error in find mongod"
                });
            });
        }
    });

});

app.post('/api/login', urlencodedParser, (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    var email = undefined;
    var password = undefined;
    if(request.body.email)
        email = request.body.email;
    if (request.body.password)
        password = request.body.password;
    if(email === undefined || password===undefined) {
        response.send({
            status_code: 400,
            msg: "Field Missing"
        });
    }

    MongoClient.connect(url, function (err, db) {
        if (err) {
            response.send({
                status_code: 500,
                msg: "can't connect to the mongodb"
            });
        }
        else {
            db.collection('User').find({
                $and: [
                    {Email: email},
                    {Password: password}
                ]
            }).count().then((count) => {
                if(count==1) {
                    response.send({
                        status_code: 200,
                        msg: "Login Data Found"
                    });
                }
                else {
                    response.send({
                        status_code: 404,
                        msg: "Login Data Not Founds"
                    });
                }
            }, (err) => {
                response.send({
                    status_code: 400,
                    msg: "Error in find mongod"
                });
            });
        }
    });
});

// app.post('/api/tweeterLogin', urlencodedParser, (request, response) => {
//     response.setHeader('Content-Type', 'application/json');
    
// });

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});