// For testing
assert = require('./assert').assert;

// Sample use:
//    var myClass = classy.extend({
//        this : function () {},
//        that : function () {}
//    });

function extend(childClass) {
    var superClass = this,
        newClass = doTheWork(superClass, childClass)
    ;
    
    newClass.extend = extend;
    newClass.superClass = handleSuper;
    return newClass;
}

function doTheWork(superClass, childClass) {
    if (isEmpty(clean(superClass))) {
        // We have a fresh new class with no super.
        return childClass;
    }
    else {
        // Merge the two classes together.

        if (!childClass._superConstructors) {
            childClass._superConstructors = [];
        }

        if (superClass.init) {
            childClass._superConstructors.push(superClass.init);
        }

        // TODO: merge the two objects together!
        return childClass;
    }
}

// Added as a member of each Classy class, this method runs through the super
// chain and sets everything up.
function handleSuper() {
    var childClass = this;

    // Go from the top of the chain to the bottom.
    while (childClass._superConstructors.length) {
        var superConstructor = childClass._superConstructors.pop();
        superConstructor.call(childClass);
    }
}

function isEmpty(thing) {
    if (typeof thing === 'object') {
        return (Object.keys(thing).length === 0);
    }
    else if (typeof thing === 'array') {
        return (thing.length === 0);
    }
    else {
        return false; // TODO: do we need to add anything to this?
    }
}

// Removed all Classy related stuff from a class.
//
function clean(classyClass) {
    var classyThings = [
        'extend',
        '_superConstructors'
    ];

    classyThings.forEach(function (thing) {
        if (classyClass[thing]) {
            delete classyClass[thing];
        }
    });

    return classyClass;
}

function die(message) {
    console.log('FATAL: ' + message);
    process.exit();
}

exports.classy = {
    extend : extend
};

// TODO write tests for some of the util methods in here.
// eg, isEmpty
