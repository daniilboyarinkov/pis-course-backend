import db_config from '../config/db'
import {CREATE_EMPLOYEE_QUERY, DELETE_EMPLOYEE_QUERY, GET_EMPLOYEE_QUERY, UPDATE_EMPLOYEE_QUERY} from '../config/queries';

const Pool = require('pg').Pool
const pool = new Pool(db_config);

exports.getEmployee = () => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_EMPLOYEE_QUERY, (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}

exports.createEmployee = (body) => {
    return new Promise(function (resolve, reject) {
        // const { } = body
        pool.query(CREATE_EMPLOYEE_QUERY, [],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new book")
                resolve({success: true, data: `A new product has been added.`})
            })
    })
}

exports.updateEmployee = (body) => {
    return new Promise(function (resolve, reject) {
        // const { } = body
        pool.query(UPDATE_EMPLOYEE_QUERY, [],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new book")
                resolve({success: true, data: `A new product has been added.`})
            })
    })
}
exports.deleteEmployee = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(DELETE_EMPLOYEE_QUERY, [id], (error, results) => {
            if (error) reject(error);
            else if (results?.rowCount === 0) reject(`Couldn't delete, there is no book with ${id} id`);
            else resolve({success: true, data: `Book with ID: ${id} was deleted`});
        })
    })
}
