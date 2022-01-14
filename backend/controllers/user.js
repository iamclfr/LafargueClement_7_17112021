const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const {Op} = require('sequelize');
const { now } = require('sequelize/dist/lib/utils');
let user = require('../models/user');
require('dotenv').config();

exports.register = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            db.users.create({
                familyName: req.body.familyName,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: hash,
                birthday: req.body.birthday,
                createdAt: now(),
                updatedAt: now(),
                profilePicture: null,
                admin: 0,
            })
            .then(() => res.status(201).json({
                message: "Utilisateur créé !",
            }))
            .catch((error) => res.status(400).json({
                error: "Erreur lors de la création de l'utilisateur ! blabla",
            }));
        })
        .catch((error) => res.status(500).json({
            error: "Erreur lors de la création de l'utilisateur !",
            message: error.message,
        }));
};


exports.login = async (req, res, next) => {
    user = await db.users.findOne({
        where: {
            [Op.or]: [{
                email: req.body.email
            }],
        },
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Utilisateur non trouvé !",
            })
        }
        bcrypt.compare(req.body.password, user.password)
        .then(validPassword => {
            if (!validPassword) {
                return res.status(401).json({
                    message: "Mot de passe incorrect !",
                })
            }
            // Update date of last connection
            db.users.update({
                updatedAt: now(),
            }, {
                where: {
                    id: user.id,
                }
            })
            res.status(200).json({
                userId: user.id,
                admin: user.admin,
                token: jwt.sign({
                    userId: user.id
                }, process.env.TOKEN, {
                    expiresIn: "24h"
                }),
            })
        })
        .catch(error => res.status(500).json({
            error
        }))
    })
    .catch(error => res.status(500).json({
        error
    }))
}


exports.getUser = async (req, res) => {
    try {
        const user = await db.users.findOne({
            where: {
                id: req.params.id
            },
        });
        if (!user) {
            res.status(404).json({
                message: "Utilisateur non trouvé !",
            });
        } else {
            let birthdayToHuman = new Date(user.birthday * 1000).toLocaleDateString("fr-FR")
            user.birthday = birthdayToHuman
            res.status(200).json({
                user: user,
                message: `Utilisateur ${user.name} trouvé !`,
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la recherche de l'utilisateur !",
        });
    }
}

// Update user
exports.updateUser = async (req, res) => {
    try {
        user = await db.users.findOne({
            where: {
                id: req.params.id
            },
        });
        if (!user) {
            res.status(404).json({
                message: "Utilisateur non trouvé !",
            });
        } else {
            db.users.update({
                familyName: req.body.familyName,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                birthday: req.body.birthday,
                updatedAt: now(),
            }, {
                where: {
                    id: user.id,
                }
            })
            .then(() => res.status(200).json({
                message: "Utilisateur modifié !",
            }))
            .catch((error) => res.status(400).json({
                error: "Erreur lors de la modification de l'utilisateur !",
            }));
        }
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de la modification de l'utilisateur !",
        });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.users.findAll({
            attributes: ["familyname", "name", "phone", "email", "birthday", "profilepicture", "admin"],
            where: {
                id: {
                    [Op.ne]: 1,
                },
            },
        });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await db.users.findOne({
            where: {
                id: req.params.id
            },
        });
        if (!user) {
            res.status(404).json({
                message: "Utilisateur non trouvé !",
            });
        } else {
            await db.users.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json({
                message: `Utilisateur ${user.name} supprimé !`,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: "Erreur lors de la suppression de l'utilisateur !",
        });
    }
}