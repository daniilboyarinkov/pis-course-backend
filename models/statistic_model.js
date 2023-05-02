const db_config = require('../config/db')
const {
    BOOK_STATISTIC,
    ORDERS_STATISTIC,
    READER_STATISTIC,
} = require('../config/queries');

const Pool = require('pg').Pool
const pool = new Pool(db_config);

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
        pool.query(ORDERS_STATISTIC, [id], (error, results) => {
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
