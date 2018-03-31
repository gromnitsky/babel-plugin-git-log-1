# babel-plugin-git-log-1

Babel plugin for inlining values from the last git commit.

Handy for embedding the relevant data from git into deployed web apps.

If you add

    let log = require('babel-plugin-git-log-1)

the plugin transforms the line to:

~~~
let log = {
    ref: 'master',
    dirty: false,
    log: {
        hash: '0603a72934b829f7490447b8d241bb9278e9c05d',
        commiter: {
            name: 'Alexander Gromnitsky',
            email: 'alexander.gromnitsky@gmail.com',
            date: '2018-03-31T14:21:12+03:00'
        },
        subject: 'init',
        body: 'just a test'
    }
};
~~~

## Setup

    $ npm i babel-plugin-git-log-1

Use it via the cli:

    babel --plugins babel-plugin-git-log-1 foo.js

By default, the plugin does its transformations only in the scope of
modules, so this won't work:

~~~
function hello() {
    let log = require('babel-plugin-git-log-1)
}
~~~

To do the transformations everywhere, pass `inner_scope` option to the
plugin via `.babelrc`:

~~~
{
    "plugins": [
        ["babel-plugin-git-log-1", {
            "inner_scope": true
        }]
    ]
}

~~~

## Bugs

* Tested only w/ babel-cli 6.26.0 on Fedora 27.
* The plugin invokes `git` to grab the data, which is lame. The Right
  Way is to use nodegit (that uses libgit2), but I've seen people who
  scream when they see a native addon dependency, besides that a mere
  `npm i nodegit` yields 89MB `node_modules` dir.

## License

MIT.
