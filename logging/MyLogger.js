'use strict'

let fs = require('fs')

class MyLogger {
    constructor() { 
        this.file = 'logs/dev.md'
    }
    logData(log) {
        console.log(log.ops)
        this.setLogger(log.ops)
        fs.appendFile(this.file, log.msg, this.error)
    }
    setLogger(ops) {
        console.log(ops)
        !ops ? this.file = `logs/log.md` : this.file = `logs/errLog.md`
        console.log(this.file)
    }
    error(err) {
        if(err) console.log(err)
    }
}

module.exports = MyLogger