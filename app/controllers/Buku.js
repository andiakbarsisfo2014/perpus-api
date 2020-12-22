const { populate } = require('../models/Buku');
const Buku = require('../models/Buku');
const ObjectId = require('mongoose').Types.ObjectId;

exports.findAll = function(request, response) {
    // const model = Buku.model(request.app.locals.db);
    let page = request.query.page !== undefined ? request.query.page : 1;
    let perpage = request.query.perpage !== undefined ? request.query.perpage : 10;
    Buku.paginate({}, {
        page: parseInt(page),
        perpage: perpage,
        populate: {
            path: 'penulis',
        },
        sort: {
            created_at: -1
        }
    })
    .then((data) => {
        response.status(200).json(data);
    })
    .catch(error => {
        response.status(500).json(error);
    })
}

exports.findById = function(request, response) {
    let id = request.params.id;
    //checking id is valid format
    if (id !== undefined || ObjectId.isValid(id)) {
        Buku.findById({_id: id})
        .exec((error, data) => {
            data.populate('penulis', (error, data) => {
                response.status(200).json(data);
            });
        })
    } else {
        response.status(404).json({message: 'Not found'})
    }
}

exports.create = function(request, response) {
    let document = request.body;
    document.created_at = new Date().toISOString();
    const buku = new Buku(document);
    buku.save((error, data) => {
        if (error){
            var errorObject = Object.keys(error.errors);
            var message = [];
            for (let index = 0; index < errorObject.length; index++) {
                var key = errorObject[index];
                var newError = {
                    key: key,
                    message: error.errors[key].message
                }
                message.push(newError);
            }
            response.status(411).json(message)
        } 
        else
            data.populate('penulis', (error, data) => {
                response.status(201).json(data)
            })
    })
}

exports.update = function(request, response) {
    let id = request.params.id;
    //checking id is valid format
    if (id !== undefined || ObjectId.isValid(id)) {
        let document = request.body;
        document.penulis = ObjectId.isValid(document.penulis) ? ObjectId.createFromHexString(document.penulis) : null;
        Buku.findByIdAndUpdate({_id: id}, {
            $set: document
        }, 
        {
            new: true, 
            useFindAndModify: false
        })
        .exec((error , data) => {
            data.populate('penulis', (error, data) => {
                response.status(200).json(data);
            })
            
        })
        
    } else {
        response.status(404).json({message: 'Not found'})
    }
}

exports.deleteById = function(request, response) {
    let id = request.params.id;
    if (id !== undefined || ObjectId.isValid(id)) {
        Buku.findByIdAndDelete({_id: id}).exec()
            .then(data => {
                response.status(200).json({message: 'Delete success'});
            })
            .catch(error => {
                response.status(500).json(error);
            })
    } else {
        response.status(404).json({message: 'Not found'})
    }
}

exports.deleteAll= function(request, response) {
    // Buku.remove({})
    Buku.deleteMany({}, (error) => {
        console.log(error);
        if (error) {
            response.status(500).json("nyin");
        } else {
            response.status(200).json({message: 'Delete success'});
        }
    })
}

// exports.pinjam = function (request, response) {
//     let id = request.params.id;
//     if (id !== undefined || ObjectId.isValid(id)) {
//         let idAnggota = request.body.anggota;
//         if (idAnggota !== undefined || ObjectId.isValid(idAnggota)) {
//             Buku.findByIdAndUpdate({_id: id}, 
//                 {
//                     $push: {
//                         history: {
//                             peminjam: ObjectId.createFromHexString(idAnggota),
//                             detail: {
//                                 tanggal_pinjam: new Date().toISOString(),
//                             }
//                         }
//                     }
//                 },
//                 {new: true, useFindAndModify: false}
//             )
//             .exec()
//             .then(data => {
//                 response.status(200).json(data);
//             })
//             .catch(error => {
//                 response.status(411).json(error);
//             })

//         } else {
//             response.status(404).json({message: 'Anggota not found'})
//         }
//     } else {
//         response.status(404).json({message: 'Book not found'})
//     }
// }

// exports.kembalikan = function (request, response) {
//     let id = request.params.id;
//     // if (id !== undefined || ObjectId.isValid(id)) {
//     //     let idAnggota = request.body.anggota;
//     //     if (idAnggota !== undefined || ObjectId.isValid(idAnggota)) {
//     //         Buku.findByIdAndUpdate({_id: id}, 
//     //             {
//     //                 $push: {
//     //                     history: {
//     //                         peminjam: ObjectId.createFromHexString(idAnggota),
//     //                         detail: {
//     //                             tanggal_pinjam: new Date().toISOString(),
//     //                         }
//     //                     }
//     //                 }
//     //             },
//     //             {new: true, useFindAndModify: false}
//     //         )
//     //         .exec()
//     //         .then(data => {
//     //             response.status(200).json(data);
//     //         })
//     //         .catch(error => {
//     //             response.status(411).json(error);
//     //         })

//     //     } else {
//     //         response.status(404).json({message: 'Anggota not found'})
//     //     }
//     // } else {
//     //     response.status(404).json({message: 'Book not found'})
//     // }
//     // Buku.findById({
//     //     'history.a': '5fb94420359d2223d71cfe91',
//     // })
//     // Buku.find({_id: id, 'history._id': '5fb9408b6604532100149fd2'}, (error, buku) => {
//     //     response.status(200).json(buku);
//     // })
//     // Buku.find({"_id": "5fb93dfc7db5cc1fca91a62d", "history.peminjam": "5fb93a2ae657471e93a072a1"})
//     // .populate('penulis')
//     // .update({
//     //     $set: {
//     //         'history.$.detail.tanggal_pinjam': new Date().toISOString()
//     //     }
//     // })

//     // .then(data => {
//     //     response.status(200).json(data);
//     // })
//     // .catch(e => {
//     //     response.status(500).json(e);
//     // })
//     Buku.findOneAndUpdate({_id: id, 'history._id': '5fb9408b6604532100149fd2'}, 
//         {
//             $set: {
//                 'history.$.detail.tanggal_kembali': new Date().toISOString()
//             }
//         }, {new: true, useFindAndModify: false}
//     )

//     .then(data => {
//         response.status(200).json(data);
//     })
//     .catch(e => {
//         response.status(500).json(e);
//     })
// }
