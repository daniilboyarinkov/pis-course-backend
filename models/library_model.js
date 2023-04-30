import db_config from '../config/db'
import {CREATE_LIBRARY_QUERY, DELETE_LIBRARY_QUERY, GET_LIBRARY_QUERY, UPDATE_LIBRARY_QUERY} from '../config/queries';

const Pool = require('pg').Pool
const pool = new Pool(db_config);

exports.getLibrary = () => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_LIBRARY_QUERY, (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}

exports.createLibrary = (body) => {
    return new Promise(function (resolve, reject) {
        // const { } = body
        pool.query(CREATE_LIBRARY_QUERY, [],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new book")
                resolve({success: true, data: `A new product has been added.`})
            })
    })
}

exports.updateLibrary = (body) => {
    return new Promise(function (resolve, reject) {
        // const { } = body
        pool.query(UPDATE_LIBRARY_QUERY, [],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new book")
                resolve({success: true, data: `A new product has been added.`})
            })
    })
}
exports.deleteLibrary = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(DELETE_LIBRARY_QUERY, [id], (error, results) => {
            if (error) reject(error);
            else if (results?.rowCount === 0) reject(`Couldn't delete, there is no book with ${id} id`);
            else resolve({success: true, data: `Book with ID: ${id} was deleted`});
        })
    })
}
