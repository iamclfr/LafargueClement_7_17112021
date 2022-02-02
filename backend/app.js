const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const db = require('./models');
const seed = require('./seeders/index');

// Sequelize sync database with models and create tables if they don't exist
db.sequelize.sync()
	.then(() => {
	  console.log('Database is connected');
	  db.User.findByPk(1, {
		  include: 'Posts'
	  }).then(user => {
		  if (!user) {
			  seed();
		  } else {
			  console.log(`ALREADY SEEDED USER ${user.id} WITH ${user.Posts.length} POSTS`);
		  }
	  }).catch(err => {
		  console.log('Erreur', err);
	  });
	})
	.catch(err => console.log('SYNC ERROR', err));

const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:8080' }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;