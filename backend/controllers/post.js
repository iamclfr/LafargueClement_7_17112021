const db = require('../models');
const user = db.users;
const post = db.posts;
const like = db.like;
// let user = require('../models/user');
// let post = require('../models/post');
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
    post.findAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'userId', 'title', 'content', 'createdAt', 'updatedAt', 'mediaUrl'],
        // include: {
        //     model: user,
        //     attributes: ['id', 'familyName', 'name', 'profilePicture'],
        // },
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
exports.getUserPosts = async (req, res, next) => {
    // Check if postId is valid
    post.findAll({
        where: {
            userId: req.userId
        },
    })
    .then(posts => {
        if (!posts) {
            return res.status(401).json({
                message: "Post non trouvé !",
            })
        }
        // Return the post in JSON format
        res.status(200).json({
            message: "Post récupéré !",
            posts: posts,
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

exports.deletePost = (req, res, next) => {
    post.destroy({ where: {id: req.params.postId} })
      .then(() => res.status(200).json({ message: 'Post removed succesfully' }))
      .catch(error => res.status(400).json({ error : error + "Erreur lors de la suppression du post !" }));
};

exports.likePost = async (req, res, next) => {
    try {
        const userId = token.getUserId(req);
        const postId = req.params.id;
        const user = await db.likes.findOne({
        where: { UserId: userId, PostId: postId },
        });
        if (user) {
        await db.like.destroy(
            { where: { UserId: userId, PostId: postId } },
            { truncate: true, restartIdentity: true }
        );
        res.status(200).send({ messageRetour: "vou n'aimez plus ce post" });
        } else {
        await db.Like.create({
            UserId: userId,
            PostId: postId,
        });
        res.status(201).json({ messageRetour: "vous aimez ce post" });
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};

exports.addComment = async (req, res) => {
    try {
        const comment = req.body.commentMessage;
        const userId = req.body.userId;
        const newComment = await db.comments.create({
        message: comment,
        userId: userId,
        PostId: req.params.id,
        });

        res
        .status(201)
        .json({ newComment, messageRetour: "votre commentaire est publié" });
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};
