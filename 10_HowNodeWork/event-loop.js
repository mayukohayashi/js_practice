// const fs = require('fs');

// setTimeout(() => console.log("Timer 1 finisher"), 0);
// setImmediate(() => console.log("Immediate 1 finish"))

// fs.readFile('test-file.txt', () => {
//   console.log('I/O finished')
// });

// console.log('Hello from the top-level code')





const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 3;

setTimeout(() => console.log("Timer 1 finisher"), 0);
setImmediate(() => console.log("Immediate 1 finish"))

fs.readFile('test-file.txt', () => {
    console.log('I/O finished')
    console.log('-----------------')


    setTimeout(() => console.log("Timer 2 finisher"), 0);
    setTimeout(() => console.log("Timer 3 finisher"), 3000);
    setImmediate(() => console.log("Immediate 2 finish"));

    process.nextTick(() => console.log('Process.nextTick'));

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encypted')
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encypted')
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encypted')
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>{
        console.log(Date.now() - start, 'password encypted')
    });

});

console.log('Hello from the top-level code')


