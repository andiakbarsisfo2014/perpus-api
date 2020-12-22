const db = require('../config/db');
const pagination = require('mongoose-paginate');
const schema = new db.Schema({
    nama: {
        type: 'string',
        required: true,
    }
}, {versionKey: false});
schema.plugin(pagination);
module.exports = db.model('Penulis', schema);