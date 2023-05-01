const db_config = require('../config/db')
const {
    CREATE_EVENT_QUERY,
    DELETE_EVENT_QUERY,
    GET_ALL_EVENT_QUERY,
    GET_EVENT_QUERY,
    UPDATE_EVENT_QUERY
} = require('../config/queries');

const Pool = require('pg').Pool
const pool = new Pool(db_config);

exports.getEvent = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_EVENT_QUERY, [id], (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}

exports.getAllEvent = () => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_ALL_EVENT_QUERY, (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}

exports.createEvent = (body) => {
    return new Promise(function (resolve, reject) {
        const { library_id, start_date, end_date, employee_id, title, description } = body
        pool.query(CREATE_EVENT_QUERY, [ library_id, start_date, end_date, employee_id, title, description],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new event")
                resolve({success: true, data: `A new event has been added.`})
            })
    })
}

exports.updateEvent = (id, body) => {
    return new Promise(function (resolve, reject) {
        const { library_id, start_date, end_date, employee_id, title, description } = body
        pool.query(UPDATE_EVENT_QUERY, [library_id, start_date, end_date, employee_id, title, description, id],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new event")
                resolve({success: true, data: `A new event has been added.`})
            })
    })
}
exports.deleteEvent = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(DELETE_EVENT_QUERY, [id], (error, results) => {
            if (error) reject(error);
            else if (results?.rowCount === 0) reject(`Couldn't delete, there is no event with ${id} id`);
            else resolve({success: true, data: `Event with ID: ${id} was deleted`});
        })
    })
}
