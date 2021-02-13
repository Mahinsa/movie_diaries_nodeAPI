const winston = require('winston');
const express = require("express");
const app = express();

require('./start_up/logging')();
require('./start_up/routes')(app);
require('./start_up/db')();
require('./start_up/config')();
require('./start_up/validation')();
require('./start_up/prod')(app);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{ winston.info(`vidly is listening on ${port}`);} );

