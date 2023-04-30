import db_config from '../config/db'
import {CREATE_STORE_QUERY, DELETE_STORE_QUERY, GET_STORE_QUERY, UPDATE_STORE_QUERY} from '../config/queries';

const Pool = require('pg').Pool
const pool = new Pool(db_config);

exports.getStore = () => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_STORE_QUERY, (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}

exports.createStore = (body) => {
    return new Promise(function (resolve, reject) {
        // const { } = body
        pool.query(CREATE_STORE_QUERY, [],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new book")
                resolve({success: true, data: `A new product has been added.`})
            })
    })
}

exports.updateStore = (body) => {
    return new Promise(function (resolve, reject) {
        // const { } = body
        pool.query(UPDATE_STORE_QUERY, [],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new book")
                resolve({success: true, data: `A new product has been added.`})
            })
    })
}

exports.deleteStore = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(DELETE_STORE_QUERY, [id], (error, results) => {
            if (error) reject(error);
            else if (results?.rowCount === 0) reject(`Couldn't delete, there is no book with ${id} id`);
            else resolve({success: true, data: `Book with ID: ${id} was deleted`});
        })
    })
}
