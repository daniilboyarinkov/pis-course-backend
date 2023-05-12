const db_config = require('../config/db')
const {
    CREATE_ORDER_QUERY,
    DELETE_ORDER_QUERY,
    GET_ALL_ORDER_QUERY,
    GET_ORDER_QUERY,
    UPDATE_ORDER_QUERY
} = require('../config/queries');

const Pool = require('pg').Pool
const pool = new Pool(db_config);

exports.getOrder = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_ORDER_QUERY, [id], (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}

exports.getAllOrders = () => {
    return new Promise(function (resolve, reject) {
        pool.query(GET_ALL_ORDER_QUERY, (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}

exports.createOrder = (body) => {
    return new Promise(function (resolve, reject) {
        const { reader_id, book_id, library_id, isLongTerm = false, isPerpetual = false } = body
        pool.query(CREATE_ORDER_QUERY, [reader_id, book_id, library_id, isLongTerm, isPerpetual],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new order")
                resolve({success: true, data: `A new order has been added.`})
            })
    })
}
exports.updateOrder = (id, body) => {
    return new Promise(function (resolve, reject) {
        console.log('lol', body)
        const { reader_id, library_id, book_id, close_date, islongterm, isperpetual } = body
        pool.query(UPDATE_ORDER_QUERY, [reader_id, library_id, book_id, close_date, islongterm, isperpetual, id],
            (error, results) => {
                if (error) reject(error?.message);
                if (results?.rowCount === 0) reject("Couldn't create a new order")
                resolve({success: true, data: `A new order has been added.`})
            })
    })
}
exports.deleteOrder = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(DELETE_ORDER_QUERY, [id], (error, results) => {
            if (error) reject(error);
            else if (results?.rowCount === 0) reject(`Couldn't delete, there is no order with ${id} id`);
            else resolve({success: true, data: `Book with ID: ${id} was deleted`});
        })
    })
}
