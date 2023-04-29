const express = require('express');
const {getBook, createBook, updateBook, deleteBook} = require('../models/books_model');
const router = express.Router();

router.get('/', function(req, res) {
    getBook()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.post('/', function(req, res) {
    createBook(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.post('/:id', function(req, res) {
    updateBook(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.delete('/:id', function(req, res) {
    deleteBook(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

module.exports = router;
