require('dotenv').config();

const database = require('../model/database.js');
const db = new database();

class contactController {
	constructor() {}

	save(req){
        return new Promise(async (resolve, reject) => {
			db.inserContact(req.body).then(result => {
                resolve({
                    code: 200
                })
            }).catch(error => {
                reject({
                    code: 500,
                    message: error
                });
            });
		});
    }
}

module.exports = contactController;