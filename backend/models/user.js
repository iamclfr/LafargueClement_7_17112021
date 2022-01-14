// module.exports = (sequelize, Sequelize) => {
//     const Users = sequelize.define("users", {
//         id: {
//             type: Sequelize.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true,
//             unique: true
//         },
//         familyName: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         name: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         phone: {
//             type: Sequelize.STRING,
//             allowNull: false,
//             unique: true
//         },
//         password: {
//             type: Sequelize.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true
//             }
//         },
//         birthday: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         email: {
//             type: Sequelize.STRING,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 isEmail: true
//             }
//         },
//         profilePicture: {
//             type: Sequelize.STRING,
//             allowNull: true
//         },
//         admin: {
//             type: Sequelize.BOOLEAN,
//             allowNull: false,
//             defaultValue: false
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

//         // Users.hasMany(models.Posts, {
//         //     foreignKey: "userId",
//         //     as: "posts"
//         // });
  
//     return Users;
//   };


const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
        // define association here
    }
  };
  User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    familyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    birthday: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    modelName: 'user',
  });
  return User;
};



// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//     class Users extends Model {
//         static associate(models) {
//             models.Users.hasMany(models.Posts);
//         }
//     }
//     Users.init({
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true,
//             unique: true
//         },
//         familyName: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         phone: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true
//             }
//         },
//         birthday: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 isEmail: true
//             }
//         },
//         profilePicture: {
//             type: DataTypes.STRING,
//             allowNull: true
//         },
//         admin: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false,
//             defaultValue: false
//         },
//         createdAt: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: DataTypes.NOW
//         },
//         updatedAt: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: DataTypes.NOW
//         }
//     }, {
//         sequelize,
//         modelName: 'users',
//         timestamps: true
//     });

//     return Users;
// }