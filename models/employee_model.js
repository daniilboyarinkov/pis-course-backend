const db_config = require('../config/db')
const {
    CREATE_EMPLOYEE_QUERY,
    DELETE_EMPLOYEE_QUERY,
    GET_ALL_EMPLOYEE_QUERY,
    GET_EMPLOYEE_QUERY,
    UPDATE_EMPLOYEE_QUERY
} = require('../config/queries');

const Pool = require('pg').Pool
const pool = new Pool(db_config);

exports.getAllEmployee = () => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_ALL_EMPLOYEE_QUERY, (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}

exports.getEmployee = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_EMPLOYEE_QUERY, [id], (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}

exports.createEmployee = (body) => {
    return new Promise(function (resolve, reject) {
        const { library_id, first_name, last_name, login, password, position } = body
        pool.query(CREATE_EMPLOYEE_QUERY, [library_id, first_name, last_name, login, password, position],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new employee")
                resolve({success: true, data: `A new employee has been added.`})
            })
    })
}

exports.updateEmployee = (id, body) => {
    return new Promise(function (resolve, reject) {
        const { library_id, first_name, last_name, login, password, position } = body
        pool.query(UPDATE_EMPLOYEE_QUERY, [library_id, first_name, last_name, login, password, position, id],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new employee")
                resolve({success: true, data: `A new employee has been added.`})
            })
    })
}
exports.deleteEmployee = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(DELETE_EMPLOYEE_QUERY, [id], (error, results) => {
            if (error) reject(error);
            else if (results?.rowCount === 0) reject(`Couldn't delete, there is no employee with ${id} id`);
            else resolve({success: true, data: `Employee with ID: ${id} was deleted`});
        })
    })
}
