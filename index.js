'use strict';

let exec = require('child_process').execSync

let run = function(cmd) {
    return exec(cmd).toString().trim()
}

let getlog = function(rev) {
    let params = ['%H', '%cn', '%ce', '%cI', '%s', '%b']
    let r = run(`git log -1 --pretty=format:${params.join('%x00')} ${rev}`)
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

let _git = function(rev = 'HEAD') {
    return {
	ref: run(`git rev-parse --abbrev-ref ${rev}`),
	dirty: run('git status --porcelain') !== '',
	log: getlog(rev)
    }
}

let git = function() {		// memoisation
    let r
    return (rev) => r ? r : (r = _git(rev))
}

let mark = /^babel-plugin-git-log-1\b/

module.exports = function({types: t}) {
    return {
	pre() {
	    this.git = git()
	},
	visitor: {
	    CallExpression(path, state) {
		if (path.scope.parent && !state.opts.inner_scope) return

		let node = path.node
		if (!(t.isIdentifier(node.callee, { name: 'require' })
		      && t.isLiteral(node.arguments[0])
		      && mark.test(node.arguments[0].value))) return

		let json
		try {
		    json = this.git(state.opts.rev)
		} catch (e) {
		    throw path.buildCodeFrameError(e.message)
		}
		path.replaceWith(t.expressionStatement(t.valueToNode(json)))
	    }
	}
    }
}
