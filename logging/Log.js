'use strict'

class Log {
    constructor(data, type, ops) {
        this.data = data || [{sumTing: 'Wong'}]
        this.type = type || 'No Type'
        this.ops = ops || false
        this.msg = ''
        this.seperator = '----\n'
        this.getMsg() //creates message when log is constructed
        this.display()
    }
    getMsg() {
        this.msg = `\n\n## ${this.type} File Starting \n\n`  
            for(let i = 0; i < this.data.length; i++) {
                let str = this.data[i]
                // this.type === 'Tweets' ? this.msg += `${i + 1}.\n` : null
                for (const key in str) {
                    this.msg += `\t* ${key}:    ${str[key]}\n`
                }
                this.msg += '\n----\n'
            }
        // this.msg += this.seperator
        return this.msg
    }
    display() {
        console.log(this.msg)
    }
}

module.exports = Log