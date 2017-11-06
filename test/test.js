var assert = require('assert');
var Client = require('node-rest-client').Client;
var client = new Client();
var assert = require('assert');

var args = {
    data: { Email: "montu33dddd66@gmail.com" },
    headers: { "Content-Type": "x-www-form-urlencoded" }
};

describe('Verified Email', function () {
    describe('#checkEmail()', function () {
        it('should return 200 when the email is present', () => {
            client.post("http://imprint-sen-app.herokuapp.com/api/checkEmail", args, function (data, response) {
                console.log(data.status_code);
            });
        });
    });
});