const { getUserJWT } = require('../helpers');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const userId = getUserJWT(token);
		if (req.body.userId && req.body.userId !== userId) {
			throw 'User ID non valable !';
		} else {
			req.userId = userId;
			next();
		}
	} catch (error) {
		res.status(401).json({
			error: error | 'Requête non authentifiée !'
		});
	}
};