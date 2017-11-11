const bcrypt = require('bcrypt-nodejs');
var hash = bcrypt.hashSync("bacon");

console.log(hash);


var p = "$2a$10$UR.uZSdQMfHIzpM2IUi4uuRJmf977m7Zv2WTJdRh7ZgVJh0goHEgK";
var q = "$2a$10$qOE7WCf7WBLD9lxgiisGEuIlJAQ8aM3OdRoCKsHza7j8A1NnFwDv2"