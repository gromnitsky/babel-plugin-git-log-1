'use strict';

let util = require('util')
let exec = util.promisify(require('child_process').exec)

let run = async function(cmd) {
    let {stdout} = await exec(cmd)
    return stdout.trim()
}

let getlog = async function() {
    let params = ['%H', '%cn', '%ce', '%cI', '%s', '%b']
    let r = (await run('git log -1 --pretty=format:' + params.join('%x00')))
	.split('\0')
    return {
	hash: r[0],
	commiter: {
	    name: r[1],
	    email: r[2],
	    date: r[3]
	},
	subject: r[4],
	body: r[5]
    }
}

let _git = async function() {
    return {
	ref: await run('git rev-parse --abbrev-ref HEAD'),
	dirty: (await run('git status --porcelain')) !== '',
	log: await getlog()
    }
}

let git = async function() {	// memoisation
    let r
    return async () => r ? r : (r = await _git())
}

let main = async function() {
    let git_log_1 = await git()
    console.log(await git_log_1())
}

main()
