var MongoClient = require('mongodb').MongoClient;
const express = require('express');
var app = new express();
var bodyParser = require('body-parser');
var url = "mongodb://imprint:montu123@ds127065.mlab.com:27065/imprint";
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('port', (process.env.PORT || 5000));
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: 'MWcmQ9U3p6eLjxMv4MF9nN5YC',
    consumer_secret: 'TsJ9F5OYwIv8BaJ2xnn2OyfoTbdbiYXb1I6YzhAviCslH1tZgb',
    access_token_key: '1286536478-3bCTZX29fUjQITYLPSA9GYTRAapSPLEYsvcLh1T',
    access_token_secret: 'ShOYfYLUPs2XhBOOgemO7e3HGz3gtO7mucuWR4QRVI8Hw'
});

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

app.post('/api/tweeterLogin', urlencodedParser, (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    console.log(request.body.screen_name);
    var a = undefined;
    if(request.body.screen_name)
        a = request.body.screen_name;
    
    var params = {screen_name: a};
    client.get('users/show', params, function(error, user, res) {
        if (!error) {
            response.send({
                status_code: 200,
                id:user.name,
                name: user.name,
                screen_name: user.screen_name,
                followers: user.followers_count,
                friends: user.friends_count,
                status: user.statuses_count,
                profilepic: user.profile_background_image_url
            });
        }
        else {
            response.send({
                status_code: 400
            });
        }
    });

});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});