const express = require('express');
const {login} = require('../models/login_model');

const router = express.Router();

router.post('/', function(req, res) {
    login(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

module.exports = router;
