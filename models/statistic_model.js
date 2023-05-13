const db_config = require('../config/db')
const {
    BOOK_STATISTIC,
    LIBRARY_STATISTIC,
    READER_STATISTIC,
    USER_BOOKS,
    TAKEN_BOOKS,
} = require('../config/queries');

const Pool = require('pg').Pool
const pool = new Pool(db_config);

exports.getUserBooks = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(USER_BOOKS, [id], (error, results) => {
            if (error) reject(error.message);
            if (results) resolve(results.rows);
        })
    })
}

exports.getTakenBooks = () => {
    return new Promise(function (resolve, reject) {
        pool.query(TAKEN_BOOKS, (error, results) => {
            if (error) reject(error.message);
            if (results) resolve(results.rows);
        })
    })
}

exports.getBookStatistic = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(BOOK_STATISTIC, [id], (error, results) => {
            if (error) reject(error);
            if (results) resolve(results.rows[0]);
        })
    })
}

exports.getOrdersStatistic = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(LIBRARY_STATISTIC, [id], (error, results) => {
            if (error) reject(error);
            resolve(results.rows[0]);
        })
    })
}

exports.getUserStatistic = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(READER_STATISTIC, [id], (error, results) => {
            if (error) reject(error);
            resolve(results.rows[0]);
        })
    })
}
