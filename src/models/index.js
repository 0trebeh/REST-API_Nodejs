const Configdb = require("../config/config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = Configdb.dburl;
db.users = require("./user.model.js")(mongoose);

module.exports = db;
