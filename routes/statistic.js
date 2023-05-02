const express = require('express');
const {getBookStatistic, getOrdersStatistic, getUserStatistic} = require('../models/statistic_model');

const router = express.Router();

router.get('/book/:id', function(req, res) {
    getBookStatistic(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.get('/library/:id', function(req, res) {
    getOrdersStatistic(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.get('/reader/:id', function(req, res) {
    getUserStatistic(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

module.exports = router;
