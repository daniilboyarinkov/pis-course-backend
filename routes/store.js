const express = require('express');
const {getAllStore, createStore, updateStore, deleteStore} = require('../models/store_model');

const router = express.Router();

router.get('/', function(req, res) {
    getAllStore()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error.message);
        })
});

router.post('/create', function(req, res) {
    createStore(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error.message);
        })
});

router.post('/update', function(req, res) {
    updateStore(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error.message);
        })
});

router.post('/delete', function(req, res) {
    deleteStore(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error.message);
        })
});

module.exports = router;
