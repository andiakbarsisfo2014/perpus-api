const connection = require('../config/Testing');

exports.find = function(param, callBack) {
    connection.db( (db, connection) => {
        db.collection('bukus').find(param).toArray((error, result) => {
            if (error) throw error
            callBack(result);
            connection.close();
        })
    })
}
