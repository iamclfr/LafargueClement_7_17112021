const { hashPassword } = require('../helpers');
const db = require('../models');
const { faker } = require('@faker-js/faker');

let migrationStatus = false;

async function userSeeder() {
    return await db.User.create({
        firstName: 'Clément',
        lastName: 'Lafargue',
        email: 'lafargue@groupomania.com',
        password: hashPassword('!Password'),
        birthday: '2000-05-03',
        isAdmin: true
    })
    .then(() => console.log('UserSeeder Success'))
    .then(() => db.User.findByPk(1))
    .catch(err => console.log('UserSeeder error: ', err));
}

async function postsSeeder(user) {
    let posts = [];

    for (let i = 0; i < 5; i++) {
        posts.push({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            createdAt: faker.date.past(1),
        });
    }

    return await db.Post.bulkCreate(posts)
    .then(() => db.Post.findAll())
    .then((posts) => {
        console.log('PostSeeder Success');
        posts.forEach((post) => {
            post.setUser(user);
        });
    })
    .then(() => db.Post.findAll())
    .catch(err => console.log('PostSeeder error: ', err));
}

// Comment Seeder
async function commentsSeeder(posts) {
    let comments = [];

    for (let i = 0; i < 5; i++) {
        comments.push({
            content: faker.lorem.paragraph(),
            createdAt: faker.date.past(1),
            UserId: 1,
        });
    }

    return await db.Comment.bulkCreate(comments)
    .then(() => db.Comment.findAll())
    .then((comments) => {
        console.log('CommentSeeder Success');
        comments.forEach((comment) => {
            comment.setPost(posts[Math.floor(Math.random() * 5)]);
        });
    })
    .then(() => db.Comment.findAll())
    .catch(err => console.log('CommentSeeder error: ', err));
}

const seed = async () => {
    if (migrationStatus) {
        console.log('ALREADY SEEDED');
        return;
    }
    
    console.log('SEEDING...');

    const user = await userSeeder();
    const posts = await postsSeeder(user);
    const comments = await commentsSeeder(posts);

    migrationStatus = true;
}

module.exports = seed;
