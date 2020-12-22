const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
exports.db = function(callBack) {
    MongoClient.connect(url, {useUnifiedTopology: true}, (error, connection) => {
        if (error) throw error;
        callBack(connection.db('perpus'), connection)
    })
}
