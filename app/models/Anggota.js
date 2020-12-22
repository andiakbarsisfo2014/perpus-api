const db = require('../config/db');
const pagination = require('mongoose-paginate');
const schema = new db.Schema({
    nama: {
        type: 'string',
        required: true,
    },
    no_telp: {
        type: 'string',
        max: 15,
        required: true,
    },
    alamat: {
        type: 'string',
        required: true,
    },
    buku: {
        type: 'array'
    }
}, {versionKey: false});
schema.plugin(pagination);
module.exports = db.model('Anggota', schema);