const db = require('../models');

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        if(!req.body.content.length === 0) {
            return res.status(422).json({
                error: 'Content is required'
            });
        }
        const comment = await db.Comment.create({
            content: req.body.content,
            UserId: req.userId,
            PostId: req.body.PostId,
        });
        if (!comment) {
            return res.status(401).json({
                message: "Comment non créé !",
            })
        }
        // Return the created comment in JSON format
        res.status(200).json({
            message: "Comment créé !",
            comment: comment,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}