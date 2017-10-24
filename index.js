var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://imprint:montu123@ds127065.mlab.com:27065/imprint";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});