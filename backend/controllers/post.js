const db = require('../models');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await db.Post.findAll({
            include: [
                {
                    model: db.User, 
                    as: "User",
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: db.Comment,
                    as: "Comments",
                    include:
                        {
                            model: db.User, 
                            as: "User",
                            attributes: ['id', 'firstName', 'lastName', 'email']
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
            // Order by date
            posts: posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
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
        const posts = await db.Post.findAll({
            where: {
                userId: req.params.id,
            },
            include: [
                {
                    model: db.Comment,
                    as: "Comments",
                    include: [
                        {
                            model: db.User,
                            as: "User",
                            attributes: ['id', 'firstName', 'lastName', 'email']
                        }
                    ]
                }
            ]
        });
        if (!posts) {
            return res.status(404).json({
                error: 'No post found',
            });
        }
        res.status(200).json({
            message: 'Post found',
            posts: posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
            posts,
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
        if(!req.body.content.length === 0) {
            return res.status(422).json({
                error: 'Content is required'
            });
        }
        const post = await db.Post.create({
            title: req.body.title,
            content: req.body.content,
            UserId: req.body.UserId,
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

// Delete post
exports.deletePost = async (req, res, next) => {
    try {
        const post = await db.Post.destroy({
            where: {
                id: req.params.id,
            }
        });
        if (!post) {
            return res.status(404).json({
                error: 'No post found',
            });
        }
        res.status(200).json({
            message: 'Post deleted',
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}
