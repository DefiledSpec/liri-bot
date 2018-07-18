'use strict'
let MyLogger = require('./MyLogger')

class Log extends MyLogger {
    constructor(data, type, ops) {
        super()
        this.data = data || [{sumTing: 'Wong'}]
        this.type = type || 'No Type'
        this.ops = ops || false
        this.msg = ''
        this.seperator = '----\n'
        this.getMsg() //creates message when log is constructed
        this.display()
        this.logData(this)
    }
    getMsg() {
        this.msg = `\n\n## ${this.type}\n\n`  
            for(let i = 0; i < this.data.length; i++) {
                let str = this.data[i]
                for (const key in str) {
                    this.msg += `\t* ${key}:    ${str[key]}\n`
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