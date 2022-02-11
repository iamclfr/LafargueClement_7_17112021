const db = require('../models');
const fs = require('fs');
const {Op} = require('sequelize');
const { now } = require('sequelize/dist/lib/utils');
let post = require('../models/post');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await db.Post.findAll({
            include: [
                {
                    model: db.User, 
                    as: "User",
                },
                {
                    model: db.Comment,
                    as: "Comments",
                    include:
                        {
                            model: db.User, 
                            as: "User"
                        }
                }
            ]
        });
        if (!posts) {
            return res.status(404).json({
                error: 'No posts found',
            });
        }
        res.status(200).json({
            posts,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

// Get a post by id
exports.getUserPosts = async (req, res, next) => {
    try {
        const post = await db.Post.findAll({
            where: {
                userId: req.params.id,
            }
        });
        if (!post) {
            return res.status(404).json({
                error: 'No post found',
            });
        }
        res.status(200).json({
            message: 'Post found',
            post,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

// Create new post
exports.createPost = async (req, res, next) => {
    try {
        const post = await db.Post.create({
            title: req.body.title,
            content: req.body.content,
            UserId: req.body.userId,
        });
        if (!post) {
            return res.status(401).json({
                message: "Post non créé !",
            })
        }
        // Return the created post in JSON format
        res.status(200).json({
            message: "Post créé !",
            post: post,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

// Update a post

// Delete post
exports.deletePost = async (req, res, next) => {
    // Check if postId is valid
    post.findOne({
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
};
