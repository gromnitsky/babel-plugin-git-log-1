let pluginTester = require("babel-plugin-tester")

let plugin = require("..")

process.env.GIT_WORK_TREE = __dirname + '/repo'
process.env.GIT_DIR = process.env.GIT_WORK_TREE + '/dotgit'

pluginTester({
    plugin: plugin,
    pluginName: 'babal-plugin-git-log-1',
    fixtures: __dirname + '/fixtures'
})
