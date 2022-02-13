const dbConfig = require("../db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.team = require("./team.model.js")(mongoose);
db.employee = require("./employee.model.js")(mongoose);
db.task = require("./task.model.js")(mongoose);

module.exports = db;