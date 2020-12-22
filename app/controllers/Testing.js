const Testing = require('../models/Testing');
exports.findAll = function(req, res) {
    Testing.find({}, (result) => {
        res.status(200).json(result);
    });
}