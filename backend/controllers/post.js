const db = require('../models');
let user = require('../models/user');
let post = require('../models/post');
const fs = require('fs');
const {Op} = require('sequelize');
const { now } = require('sequelize/dist/lib/utils');
require('dotenv').config();

// Create a new post
exports.createPost = async (req, res, next) => {
    // Create the post in the database
    db.posts.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.userId,
        createdAt: now(),
        updatedAt: now(),
        // mediaUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    .then(post => {
        // Return the created post in JSON format
        res.status(201).json({
            message: "Post créé !",
            post: post,
        })
    })
    .catch(error => {
        res.status(400).json({
            error: error + "Erreur lors de la création du post !",
        })
    })
}

// Get all posts
exports.getAllPosts = async (req, res, next) => {
    // Get all posts from the database
    post = await db.posts.findAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'userId', 'title', 'content', 'createdAt', 'updatedAt', 'mediaUrl'],
        include: {
            model: db.users,
            attributes: ['id', 'familyName', 'name', 'profilePicture'],
        },
    })
    .then(posts => {
        // Return the posts in JSON format
        res.status(200).json({
            posts: posts,
            // Count the number of posts
            postsCounter: posts.length
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error + "Erreur lors de la récupération des posts !",
        })
    })
}

// Get a post by id
exports.getPost = async (req, res, next) => {
    // Check if postId is valid
    post = await db.posts.findOne({
        where: {
            [Op.or]: [{
                id: req.params.postId
            }],
        },
        include: [{
            model: db.users,
            attributes: ['id', 'familyName', 'name', 'profilePicture'],
        }],
    })
    .then(post => {
        if (!post) {
            return res.status(401).json({
                message: "Post non trouvé !",
            })
        }
        // Return the post in JSON format
        res.status(200).json({
            message: "Post récupéré !",
            post: post,
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error + "Erreur lors de la récupération du post !",
        })
    })
}

// Update a post
exports.updatePost = async (req, res, next) => {
    // Check if postId is valid
    post = await db.posts.findOne({
        where: {
            [Op.or]: [{
                id: req.params.postId
            }],
        },
    })
    .then(post => {
        if (!post) {
            return res.status(401).json({
                message: "Post non trouvé !",
            })
        }
        // Update the post in the database
        post = db.posts.update({
                title: req.body.title,
                content: req.body.content,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                updatedAt: now(),
            }, {
                where: {
                    id: req.params.postId
                }
            })
            .then(post => {
                // Return the updated post in JSON format
                res.status(200).json({
                    message: "Post modifié !",
                    post: post,
                })
            })
            .catch(error => {
                res.status(400).json({
                    error: error + "Erreur lors de la modification du post !",
                })
            })
    })
    .catch(error => {
        res.status(500).json({
            error: error + "Erreur lors de la modification du post !",
        })
    })
}

// Delete a post
exports.deletePost = async (req, res, next) => {
    // Check if postId is valid
    post = await db.posts.findOne({
        where: {
            [Op.or]: [{
                id: req.params.postId
            }],
        },
    })
    .then(post => {
        if (!post) {
            return res.status(401).json({
                message: "Post non trouvé !",
            })
        }
        // Delete the post in the database
        post = db.posts.destroy({
            where: {
                id: req.params.postId
            }
        })
        .then(post => {
            // Return the deleted post in JSON format
            res.status(200).json({
                message: "Post supprimé !",
                post: post,
            })
        })
        .catch(error => {
            res.status(400).json({
                error: error + "Erreur lors de la suppression du post !",
            })
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error + "Erreur lors de la suppression du post !",
        })
    })
}