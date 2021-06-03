const mysql = require('mysql2');

const settings = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'homnayangi',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(settings);

const promisePool = pool.promise();

const getUsers = async () => {
    let sql = "SELECT * FROM  tbl_user";
    const [rows, fields] = await promisePool.query(sql);
    return rows;
}

const getRecipes = async () => {
    let sql = "SELECT * FROM tbl_recipe";
    const [rows, fields] = await promisePool.query(sql);
    return rows;
}

module.exports = {
    getUsers: getUsers,
    getRecipes: getRecipes
}