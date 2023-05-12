const express = require('express');
const {getAllLibrary, getLibrary, createLibrary, updateLibrary, deleteLibrary} = require('../models/library_model');

const router = express.Router();

router.get('/', function(req, res) {
    getAllLibrary()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.post('/', function(req, res) {
    createLibrary(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.get('/:id', function(req, res) {
    getLibrary(req.params.id, req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.post('/:id', function(req, res) {
    updateLibrary(req.params.id, req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error.message);
        })
});

router.delete('/:id', function(req, res) {
    deleteLibrary(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

module.exports = router;
