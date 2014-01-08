exports.assert = function(value1, value2, message) {
    if (value1 === value2) {
        return true;
    }
    else {
        console.log('FAIL: ' + message);
    }
}
