import db_config from '../config/db'
import {CREATE_READER_QUERY, DELETE_READER_QUERY, GET_READER_QUERY, UPDATE_READER_QUERY} from '../config/queries';

const Pool = require('pg').Pool
const pool = new Pool(db_config);

exports.getReader = () => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_READER_QUERY, (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}

exports.createReader = (body) => {
    return new Promise(function (resolve, reject) {
        // const { } = body
        pool.query(CREATE_READER_QUERY, [],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new book")
                resolve({success: true, data: `A new product has been added.`})
            })
    })
}

exports.updateReader = (body) => {
    return new Promise(function (resolve, reject) {
        // const { } = body
        pool.query(UPDATE_READER_QUERY, [],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new book")
                resolve({success: true, data: `A new product has been added.`})
            })
    })
}

exports.deleteReader = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(DELETE_READER_QUERY, [id], (error, results) => {
            if (error) reject(error);
            else if (results?.rowCount === 0) reject(`Couldn't delete, there is no book with ${id} id`);
            else resolve({success: true, data: `Book with ID: ${id} was deleted`});
        })
    })
}
