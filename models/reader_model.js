const db_config = require('../config/db')
const {
    CREATE_READER_QUERY,
    DELETE_READER_QUERY,
    GET_ALL_READER_QUERY,
    GET_READER_QUERY,
    UPDATE_READER_QUERY
} = require('../config/queries');

const Pool = require('pg').Pool
const pool = new Pool(db_config);

exports.getReader = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_READER_QUERY, [id], (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}
exports.getAllReaders = () => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_ALL_READER_QUERY, (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}

exports.createReader = (body) => {
    return new Promise(function (resolve, reject) {
        const { first_name, last_name, login, password } = body
        pool.query(CREATE_READER_QUERY, [first_name, last_name, login, password],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new reader")
                resolve({success: true, data: `A new reader has been added.`})
            })
    })
}

exports.updateReader = (id, body) => {
    return new Promise(function (resolve, reject) {
        const { first_name, last_name, login, password } = body
        pool.query(UPDATE_READER_QUERY, [first_name, last_name, login, password, id],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new reader")
                resolve({success: true, data: `A new reader has been added.`})
            })
    })
}

exports.deleteReader = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(DELETE_READER_QUERY, [id], (error, results) => {
            if (error) reject(error);
            else if (results?.rowCount === 0) reject(`Couldn't delete, there is no reader with ${id} id`);
            else resolve({success: true, data: `Reader with ID: ${id} was deleted`});
        })
    })
}
