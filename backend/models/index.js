require('dotenv').config();
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: 'mysql',
	operatorAliases: false,
	pool: {
		max: process.env.DB_POOL_MAX,
        min: process.env.DB_POOL_MIN,
        acquire: process.env.DB_POOL_ACQUIRE,
        idle: process.env.DB_POOL_IDLE
	}
});

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user.js')(sequelize, Sequelize);
db.posts = require('../models/post.js')(sequelize, Sequelize);
db.likes = require('../models/like.js')(sequelize, Sequelize);
db.comments = require('../models/comment.js')(sequelize, Sequelize);

module.exports = db;