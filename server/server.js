/**
 *
 *      This does stuff.
 *
 */

var express = require("express"),
    http = require("http"),
    port = 5000,
    app = express(),
    path = require('path')
;

// App Configuration
app.configure(function () {

    app.use(express.static(path.join(__dirname, '..')));
    
    // Complain as loudly as possible when an error occurs.
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

// Start Node.js app
http.createServer(app).listen(port);

console.log("Welcome to Vasari's Random Things!");
console.log('Hit http://localhost:' + port + ' to start debugging!!');
