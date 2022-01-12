// module.exports = (sequelize, Sequelize) => {
//     const Posts = sequelize.define("posts", {
//         id: {
//             type: Sequelize.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true,
//             unique: true
//         },
//         userId: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: {
//                 model: "users",
//                 key: "id"
//             },
//             onUpdate: "CASCADE",
//             onDelete: "CASCADE"
//         },
//         title: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         content: {
//             type: Sequelize.TEXT,
//             allowNull: false
//         },
//         mediaUrl: {
//             type: Sequelize.STRING,
//             allowNull: true,
//             defaultValue: null,
//             validate: {
//                 isUrl: true
//             }
//         },
//         createdAt: {
//             type: Sequelize.DATE,
//             allowNull: false,
//             defaultValue: Sequelize.NOW
//         },
//         updatedAt: {
//             type: Sequelize.DATE,
//             allowNull: false,
//             defaultValue: Sequelize.NOW
//         }
//     });

//     return Posts;
// }

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        static associate(models) {
            Posts.belongsTo(models.Users, {
                foreignKey: {
                    allowNull: false
                },
                onDelete: 'CASCADE'
            });
        }
    }
    Posts.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        mediaUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                isUrl: true
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'posts',
        timestamps: true
    });

    return Posts;
}