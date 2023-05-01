const db_config = require('../config/db')
const {
    READER_LOGIN,
    EMPLOYEE_LOGIN,
} = require('../config/queries');

const Pool = require('pg').Pool
const pool = new Pool(db_config);

exports.login = (body) => {
    return new Promise(function (resolve, reject) {
        const {login, password} = body;

        pool.query(READER_LOGIN, [login, password], (error, results) => {
            if (results.rows.length === 0) {
                pool.query(EMPLOYEE_LOGIN, [login, password], (error, results) => {
                    if (error) reject(error);
                    resolve(results.rows[0] ?? null);
                })
            }
            else {
                if (error) reject(error);
                if (results.rows.length === 0) {
                    reject('Неверный логин или пароль!');
                }
                resolve(results.rows[0]);
            }
        })
    })
}
