const Anggota = require('../models/Anggota');
const ObjectId = require('mongoose').Types.ObjectId;

exports.findAll = function(request, response) {
    //pagination param
    let page = request.query.page !== undefined ? request.query.page : 1;
    let perpage = request.query.perpage !== undefined ? request.query.perpage : 10;
    //set params in to model
    Anggota.paginate({}, {
        page: page,
        perpage: perpage,
    })
    .then(data => {
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
        Anggota.findById({_id: id})
            .then(data => {
                response.status(200).json(data);
            })
            .catch(error => {
                response.status(500).json(error);
            })
    } else {
        response.status(404).json({message: 'Not found'})
    }
}

exports.create = function(request, response) {
    let document = request.body;
    const anggota = new Anggota(document);
    anggota.save()
        .then(data => {
            response.status(201).json(data);
        })
        .catch(error => {
            response.status(411).json(error);
        })
}

exports.update = function(request, response) {
    let id = request.params.id;
    //checking id is valid format
    if (id !== undefined || ObjectId.isValid(id)) {
        let document = request.body;
        Anggota.findByIdAndUpdate({_id: id}, {
            $set: document
        }, 
        {
            new: true, 
            useFindAndModify: false
        })
        .exec()
        .then(data => {
            response.status(200).json(data);
        })
        .catch(error => {
            response.status(411).json(error);
        })
    } else {
        response.status(404).json({message: 'Not found'})
    }
}

exports.deleteById = function(request, response) {
    let id = request.params.id;
    if (id !== undefined || ObjectId.isValid(id)) {
        Anggota.findByIdAndDelete({_id: id}).exec()
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
    Anggota.remove()
        .then(() => {
            response.status(200).json({message: 'Delete success'});
        })
        .catch(error => {
            response.status(500).json(error);
        })
}