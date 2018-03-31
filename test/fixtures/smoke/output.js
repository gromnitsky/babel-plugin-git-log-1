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
        body: ''
    }
};

let foo = 'babel-plugin-git-log-1';

console.log(require(foo));
require();

function bar() {
    let log = require('babel-plugin-git-log-1');
    console.log(log);
}

console.log(log);
