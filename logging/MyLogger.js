'use strict'
let fs = require('fs')

class MyLogger {
    constructor() { 
        this.file = 'logs/dev.md'
    }
    logData(log) {
        this.setLogger(log.ops)
        fs.appendFile(this.file, log.msg, this.error)
    }
    setLogger(ops) {
        !ops ? this.file = `logs/log.md` : this.file = `logs/errLog.md`
    }
    error(err) {
        if(err) console.log(err)
    }
}

module.exports = MyLogger