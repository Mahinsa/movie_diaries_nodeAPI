const winston = require('winston');
const config = require('config');
require('winston-mongodb');
require('express-async-errors');

module.exports = function (){
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize({all:true}),
          winston.format.prettyPrint({all:true}),
          winston.format.simple()
        ),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: 'combined.log' }),
          new winston.transports.MongoDB({ db: config.get('vidly_db') })
        ]
      });
    
    process.on('uncaughtException',(ex)=>{
        winston.error(ex.message,ex);
    });
    
    process.on('unhandledRejection',(ex)=>{
        winston.error(ex.message,ex);
    });
    
    winston.add(logger);
}