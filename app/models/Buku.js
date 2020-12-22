const db = require('../config/db')
const pagination = require('mongoose-paginate');
const schema = new db.Schema({
    judul: {
        type: 'string',
        required: true,
    },
    penulis: {
        type: db.Schema.Types.ObjectId,
        ref: 'Penulis',
        required: true,
    },
    created_at: {
        type: 'date'
    }
}, {versionKey: false});
schema.plugin(pagination);
module.exports = db.model('Buku', schema);