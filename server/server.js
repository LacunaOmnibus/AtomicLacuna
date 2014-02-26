/**
 *
 *      This does stuff.
 *
 */

var express = require("express"),
    http = require("http"),
    port = process.env.PORT || 5000,
    app = express(),
    path = require('path')
;

// App Configuration
app.configure(function() {
    
    // Specify the directory to serve
    app.use(express.static(path.join(__dirname, '..')));
});

// Start Node.js app
http.createServer(app).listen(port);

console.log("Welcome to Vasari's Random Things!");
console.log('Hit http://localhost:' + port + ' to start debugging!!');
