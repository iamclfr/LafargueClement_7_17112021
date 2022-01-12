module.exports = (sequelize, Sequelize) => {
    const Likes = sequelize.define("likes", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    });

    return Likes;
}