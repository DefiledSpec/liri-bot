'use strict'
let Logger = require('./Logger')

class Log extends Logger {
    constructor(data, type, ops) {
        super()
        this.data = data || [{sumTing: 'Wong'}]
        this.type = type || 'No Type'
        this.ops = ops || false
        this.msg = ''
        this.seperator = '----\n'
        this.getMsg() //creates message when log is constructed
        this.display() //displays message to console
        this.logData(this) //logs message to appropriate log file using Logger class
    }
    getMsg() {
        this.msg = `\n\n## ${this.type}\n\n`  
            for(let i = 0; i < this.data.length; i++) {
                let str = this.data[i]
                for (const key in str) {
                    this.msg += `\t* ${key}:\t${str[key]}\n`
                }
                this.msg += '----\n'
            }
        return this.msg
    }
    display() {
        console.log(this.msg)
    }
}

module.exports = Log