import db_config from '../config/db'
import {CREATE_EVENT_QUERY, DELETE_EVENT_QUERY, GET_EVENT_QUERY, UPDATE_EVENT_QUERY} from '../config/queries';

const Pool = require('pg').Pool
const pool = new Pool(db_config);

exports.getEvent = () => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_EVENT_QUERY, (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}

exports.createEvent = (body) => {
    return new Promise(function (resolve, reject) {
        // const { } = body
        pool.query(CREATE_EVENT_QUERY, [],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new book")
                resolve({success: true, data: `A new product has been added.`})
            })
    })
}

exports.updateEvent = (body) => {
    return new Promise(function (resolve, reject) {
        // const { } = body
        pool.query(UPDATE_EVENT_QUERY, [],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new book")
                resolve({success: true, data: `A new product has been added.`})
            })
    })
}
exports.deleteEvent = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(DELETE_EVENT_QUERY, [id], (error, results) => {
            if (error) reject(error);
            else if (results?.rowCount === 0) reject(`Couldn't delete, there is no book with ${id} id`);
            else resolve({success: true, data: `Book with ID: ${id} was deleted`});
        })
    })
}
