let log = require('babel-plugin-git-log-1/json')

let foo = 'babel-plugin-git-log-1'

console.log(require(foo))
require()

function bar() {
    let log = require('babel-plugin-git-log-1')
    console.log(log)
}

console.log(log)
