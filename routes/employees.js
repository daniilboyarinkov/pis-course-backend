const express = require('express');
const {getAllEmployee, getEmployee, createEmployee, deleteEmployee, updateEmployee} = require('../models/employee_model');

const router = express.Router();

router.get('/', function(req, res) {
    getAllEmployee()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.post('/', function(req, res) {
    createEmployee(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.get('/:id', function(req, res) {
    getEmployee(req.params.id, req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.post('/:id', function(req, res) {
    updateEmployee(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.delete('/:id', function(req, res) {
    deleteEmployee(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

module.exports = router;
