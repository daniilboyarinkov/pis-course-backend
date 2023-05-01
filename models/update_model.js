const db_config = require('../config/db')
const {
    UPDATE_QUERY
} = require('../config/queries');

const Pool = require('pg').Pool
const pool = new Pool(db_config);

exports.update = () => {
    return new Promise(function (resolve, reject) {
        pool.query(UPDATE_QUERY, (error, results) => {
            if (error) reject(error);
            resolve(results.rows);
        })
    })
}
