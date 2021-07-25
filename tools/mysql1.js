const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

var sequelize = new Sequelize('homnayangi','root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
});