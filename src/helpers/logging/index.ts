import {createLogger, format, transports } from "winston";

const level = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};


export default createLogger({

    transports: 
        new transports.File({
            filename: 'logs/server.log',
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${info.level}: ${info.timestamp}: ${info.message}`)
            )
        })
});


// But morgan has in nodemodules