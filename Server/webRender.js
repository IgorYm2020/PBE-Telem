const fs = require('fs')

// basicPage-> index.html
// basicScript-> index.js

exports.start=()=>{    
    // Loading basic HTML page
    fs.readFile('src/index.html', 'utf-8', (err, data) => {
        if (err) throw err;
        exports.basicPage=data;
    });
    fs.readFile('src/index.js', 'utf-8', (err, data) => {
        if (err) throw err;
        exports.basicScript=data;
    });
    fs.readFile('src/table.html', 'utf-8', (err, data) => {
        if (err) throw err;
        exports.tablePage=data;
    });
    fs.readFile('src/login.js', 'utf-8', (err, data) => {
        if (err) throw err;
        exports.loginScript=data;
    });
}