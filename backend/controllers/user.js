const { hashPassword, checkPassword, createUserJWT } = require('../helpers');
const db = require('../models');
const {Op} = require('sequelize');
const { now } = require('sequelize/dist/lib/utils');
let user = require('../models/user');

exports.register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, birthday } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await db.User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            birthday,
        });
        res.status(201).json({
            message: 'User created',
            token: createUserJWT(user.id),
            user,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.User.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }
        if(!checkPassword(password, user.password)) {
            return res.status(403).json({
                error: 'Incorrect password',
            });
        }
        res.status(200).json({
            message: 'User logged in',
            token: createUserJWT(user.id),
            user,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};




// Get user by id
exports.getUser = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }
        res.status(200).json({
            message: 'User found',
            user,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

// Update user with id if token is valid
exports.updateUser = async (req, res) => {
    try {
        const { password, firstName, lastName } = req.body;
        const user = await db.User.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }
        if (password) {
            const hashedPassword = await hashPassword(password);
            user.password = hashedPassword;
        }
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        await user.save();
        res.status(200).json({
            message: 'User updated',
            user,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'birthday'],
        });
        if (!users) {
            return res.status(404).json({
                error: 'Users not found',
            });
        }
        res.status(200).json({
            message: 'Users found',
            users,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

// Delete user with id if token is valid
exports.deleteUser = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }
        await user.destroy();
        res.status(200).json({
            message: 'User deleted',
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};