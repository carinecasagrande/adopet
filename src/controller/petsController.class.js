require('dotenv').config();

const database = require('../model/database.js');
const db = new database();

class petsController {
	constructor() {}

	getPets() {
		return new Promise(async (resolve, reject) => {
			db.getAll('pets').then(list => {
				for (var i in list) {
					list[i].image = 'data:' + list[i].image_type + ';base64,' + list[i].image.toString('base64');
				}
				resolve(list);
			}).catch(error => {
				reject({
					code: 500,
					message: error
				});
			});
		});
	}
}

module.exports = petsController;