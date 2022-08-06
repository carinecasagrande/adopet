require('dotenv').config();

const database = require('../model/database.js');
const db = new database();

class userController {
	constructor() {}

	editProfile(req) {
		return new Promise(async (resolve, reject) => {
			db.updateUser(req).then(result => {
				db.findByKey('user', 'id', req.session.user.id).then(user => {
					if (user.image != null) {
						user.image = 'data:' + user.image_type + ';base64,' + user.image.toString('base64');
					}

					req.session.user = user;
					resolve({
						code: 200
					});
				});
			}).catch(error => {
				reject({
					code: 500,
					message: error
				});
			});
		})
	}

	register(data) {
		return new Promise(async (resolve, reject) => {
			db.findByKey('user', 'email', data.email).then(user => {
				if (user != null) {
					reject({
						code: 400,
						message: 'Email já está sendo utilizado. Faça login para continuar.'
					});
				} else {
					db.insertUser(data).then(result => {
						resolve({
							code: 200
						})
					}).catch(error => {
						reject({
							code: 500,
							message: error
						});
					});
				}
			}).catch(error => {
				reject({
					code: 500,
					message: error
				});
			});
		});
	}

	login(req) {
		return new Promise(async (resolve, reject) => {
			db.findByKey('user', 'email', req.body.email).then(user => {
				if (user == null) {
					reject({
						code: 400,
						message: 'Usuário não existe! Registre-se para continuar.'
					});
				} else if (user.password != req.body.password) {
					reject({
						code: 401,
						message: 'Senha incorreta!'
					});
				} else {
					req.session.loggedin = true;
					if (user.image != null) {
						user.image = 'data:' + user.image_type + ';base64,' + user.image.toString('base64');
					}

					req.session.user = user;
					resolve({
						code: 200
					});
				}
			}).catch(error => {
				reject({
					code: 500,
					message: error
				});
			});
		});
	}
}

module.exports = userController;