'use strict'

class Log {
    constructor(data, type, ops) {
        this.data = data || [{sumTing: 'Wong'}]
        this.type = type || 'No Type'
        this.ops = ops || false
        this.msg = ''
        this.seperator = '\n--------------------------------\n'
        this.getMsg() //creates message when log is constructed
    }
    getMsg() {
        this.msg = `\n----- ${this.type} File Starting -----\n\n`  
            for(let i = 0; i < this.data.length; i++) {
                let str = this.data[i]
                for (const key in str) {
                    this.msg += `${key} => ${str[key]}\n`
                }
            }
        this.msg += this.seperator
        return this.msg
    }
}

module.exports = Log