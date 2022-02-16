const { hashPassword, checkPassword, createUserJWT } = require('../helpers');
const db = require('../models');

exports.register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, birthday, phone } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await db.User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            birthday,
            phone
        });
        res.status(201).json({
            message: 'User created',
            token: createUserJWT(user.id),
            // Return id, firstName, LastName, email, birthday, isAdmin
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                birthday: user.birthday,
                phone: user.phone,
                isAdmin: user.isAdmin,
            },
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
            // Return id, firstName, LastName, email, birthday, isAdmin
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                // Convert birthday to date DD/MM/YYYY
                birthday: user.birthday.toLocaleDateString(),
                isAdmin: user.isAdmin,
            },
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
            // Return id, firstName, LastName, email, birthday, isAdmin
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                // Convert birthday to date DD/MM/YYYY
                birthday: user.birthday.toLocaleDateString(),
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, phone } = req.body;
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
        await user.update({
            firstName,
            lastName,
            phone,
        });
        res.status(200).json({
            message: 'User updated',
            // Return firstName, LastName, phone
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                // Convert birthday to date DD/MM/YYYY
                birthday: user.birthday.toLocaleDateString(),
                isAdmin: user.isAdmin,
            },
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
            // return number of users
            usersTotal: users.length,
            // return last user order by date
            userLast: users[users.length - 1],
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