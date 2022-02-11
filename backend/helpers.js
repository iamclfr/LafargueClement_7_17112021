const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

const checkPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

const createUserJWT = (userId) => {
    return jwt.sign({ userId }, process.env.TOKEN, { expiresIn: '1h' });
};

const getUserJWT = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN);
        return decoded.userId;
    }
    catch (error) {
        throw {
            message: 'Token Invalid'
        }
    }
};

module.exports = {
    hashPassword,
    checkPassword,
    createUserJWT,
    getUserJWT
}