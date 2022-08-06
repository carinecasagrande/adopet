const mysql = require('mysql');
require('dotenv').config();

class database {
    constructor() {}

    connect() {
        return mysql.createConnection(`mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_SCHEMA}`);
    }

    updateUser(req) {
        return new Promise(async (resolve, reject) => {
            var conn = this.connect();
            var sql = "UPDATE `adopet`.`user` SET ? WHERE (`id` = '1');";
            var obj = {
                name: req.body.name,
                phone: req.body.phone == "" ? null : req.body.phone.replace(/[^0-9]/g, ''),
                city: req.body.city == "" ? null : req.body.city,
                about: req.body.city == "" ? null : req.body.about,
            }

            if (req.body.remove_image == 1) {
                obj.image = null;
                obj.image_type = null;
            } else if (req.files["image"] != undefined && req.files["image"][0].size > 0) {
                obj.image = req.files["image"][0].buffer;
                obj.image_type = req.files["image"][0].mimetype;
            }

            var bean = [
                obj, req.session.user.id
            ];

            conn.query(sql, bean, function (err, result, fields) {
                if (err != null) {
                    reject(err.sqlMessage);
                } else {
                    resolve();
                }
            });
        });
    }

    findByKey(table, field, value) {
        return new Promise(async (resolve, reject) => {
            var conn = this.connect();
            var sql = "SELECT * FROM `" + table + "` WHERE `" + field + "` = '" + value + "' LIMIT 1";
            conn.query(sql, function (err, result) {
                if (err != null) {
                    reject(err.sqlMessage);
                } else if (result.length == 0) {
                    resolve(null);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    getAll(table) {
        return new Promise(async (resolve, reject) => {
            var conn = this.connect();
            var sql = "SELECT * FROM `" + table + "`";
            conn.query(sql, function (err, result) {
                if (err != null) {
                    reject(err.sqlMessage);
                } else {
                    resolve(result);
                }
            });
        });
    }

    inserContact(data) {
        return new Promise(async (resolve, reject) => {
            var conn = this.connect();
            var sql = "INSERT INTO `contact` (`name`, `phone`, `pet`, `message`) VALUES (?)";
            var bean = [
                [
                    data.name,
                    data.phone.replace(/[^0-9]/g, ''),
                    data.pet,
                    data.message
                ]
            ]
            conn.query(sql, bean, function (err, result, fields) {
                if (err != null) {
                    reject(err.sqlMessage);
                } else {
                    resolve();
                }
            });
        });
    }

    insertUser(data) {
        return new Promise(async (resolve, reject) => {
            var conn = this.connect();
            var sql = "INSERT INTO `user` (`email`, `name`, `password`) VALUES (?)";
            var bean = [
                [
                    data.email,
                    data.name,
                    data.password,
                ]
            ];
            conn.query(sql, bean, function (err, result, fields) {
                if (err != null) {
                    reject(err.sqlMessage);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = database