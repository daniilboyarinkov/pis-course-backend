const express = require('express');
const {update} = require('../models/update_model');

const router = express.Router();

router.get('/', function(req, res) {
    update()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

module.exports = router;
