
var Classy = require('./classy').classy,
    assert = require('./assert').assert
;

var myClass = Classy.extend({
    init : function (baz) {
        this.baz = baz;
    },
    foo : function () {
        return this.baz;
    },
    bar : function () {
        return 10;
    }
});

console.log(myClass);

var myClassChild = myClass.extend({
    foo : function () {
        this.superClass(500);
        return this.baz / 5;
    },
    bar : function () {
        return 400;
    }
});

console.log(myClassChild);



// TESTS
var class1 = myClass.init(20);
var class2 = myClassChild.init();

assert(class1.bar(), 10, 'Instance methods not set up correctly');
assert(class1.foo(), 20, 'Scope not set up correctly');

assert(class2.bar(), 400, 'Correct value not returned when a method is overridden');
assert(class2.foo(), 100, 'Super not being handle correctly');
