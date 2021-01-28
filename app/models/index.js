const dbConfig = require('../config/db.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require('./tutorialModel.js')(sequelize, Sequelize);

module.exports = db;