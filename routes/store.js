const express = require('express');
const {getStore, getAllStore, createStore, updateStore, deleteStore} = require('../models/store_model');

const router = express.Router();

router.get('/', function(req, res) {
    getAllStore()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.post('/', function(req, res) {
    createStore(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.post('/:id', function(req, res) {
    updateStore(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.get('/:id', function(req, res) {
    getStore(req.params.id, req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.delete('/:id', function(req, res) {
    deleteStore(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

module.exports = router;
