const mongoose = require("mongoose");
const winston = require('winston');
const config = require('config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = async function () {
    await mongoose.connect(config.get('vidly_db'))
    .then(()=>winston.info("connected to the db"));  
}