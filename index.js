const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Buku = require('./app/routes/Buku');
const Anggota = require('./app/routes/Anggota');
const Penulis = require('./app/routes/Penulis');
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/buku', Buku);
app.use('/api/v1/anggota', Anggota);
app.use('/api/v1/penulis', Penulis);
const server = app.listen(port, () => { console.warn(`Server running at: ${port}`) });
var io = require('socket.io')(server, {cors: {origin: '*'}});

io.on('connection', (socket) => {
    const BukuModel = require('./app/models/Buku');
    BukuModel.watch().on('change', (dataWatch) => {
        if (dataWatch.operationType === 'insert') {
            BukuModel.findOne({_id: dataWatch.documentKey._id}).populate('penulis')
            .exec((error, data) => {
                socket.emit('buku', data)
            })
        }
        else if(dataWatch.operationType === 'update') {
            BukuModel.findOne({_id: dataWatch.documentKey._id}).populate('penulis')
            .exec((error, data) => {
                socket.emit(dataWatch.documentKey._id, data)
            })
        }
    });
    // const PenulisModel = require('./app/models/Penulis');
    // PenulisModel.watch().on('change', (dataWatch) => {
    //     if (dataWatch.operationType === 'insert') {
    //         // BukuModel.findOne({_id: dataWatch.documentKey._id}).populate('penulis')
    //         // .exec((error, data) => {
    //         //     socket.emit('buku', data)
    //         // })
    //     }
    //     else if(dataWatch.operationType === 'update') {
    //         socket.emit(dataWatch.documentKey._id, dataWatch.updateDescription.updatedFields)
    //     }
    // });
})

