function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function vec2(x, y) {
    const _x = x;
    const _y = y;
    const length = () => Math.sqrt(_x ** 2 + _y ** 2);

    return {
        x: _x,
        y: _y,
        length
    }
}

function vec3(x, y, z) {
    const _x = x;
    const _y = y;
    const _z = z;
    const length = () => Math.sqrt(
        _x ** 2 +
        _y ** 2 +
        _z ** 2
    );

    return {
        x: _x,
        y: _y,
        z: _z,
        length
    }
}

// distance, angle -> vec2
const to_cartesian = (distance, angle) => [
    distance * Math.cos(angle),
    distance * Math.sin(angle)
];

// x,y -> [length, angle (radians)]
const to_polar = (x, y) => [
    vec2(x, y).length(),
    Math.atan2(y, x)
];

// simple equality assertion test
const assertEquals = (val1, val2) => { if (val1 !== val2) throw Error(`Assertion Error: ${a} !== ${b}`) };

// pair values in two lists => list of tuples
const zip = (vec1, vec2) => vec1.map(
    (_, i) => [vec1[i], vec2[i]]);

// reducer for sum,sums()
const summer = (a, b) => a + b;
const differ = (a, b) => a - b;

// add all items in a list
const sum = (vec) => vec.reduce(summer, 0)
const diff = (vec) => vec.reduce(differ, 0)

// pairwise add values in two lists => list of sums
const sums = (vec1, vec2) => zip(vec1, vec2).map(tup => tup.reduce(summer, 0));
const diffs = (vec1, vec2) => zip(vec1, vec2).map(tup => tup.reduce(differ));

// reducer for multiplications
const multiplier = (a, b) => a * b;
const multiplications = (vec1, vec2) =>
    zip(vec1, vec2).map(tup => tup.reduce(multiplier, 1));

// dot product
const dot = (vec1, vec2) => multiplications(vec1, vec2).reduce(summer, 0);


const addLists = (v1, v2) => [...[...sums(v1, v2)]];
const subLists = (v1, v2) => [...[...diffs(v1, v2)]];

const mapToFrom = (to, from) => [subLists(to, from), 0, 0];

// get the component of a vector in a direction
const component = (v, dir) => dot(v, [...dir]) / v3(...dir).length();

// project a vector onto a direction
const vec3To2d = (v) =>
    [
        // v.x,
        component(v, [1, 0, 0]),
        // v.y,
        component(v, [0, 1, 0])
    ];

function scale(vec, scalar) {
    return vec.map(v => v * scalar);
}

function translate(vec, translationVec) {
    if (vec.length !== translationVec.length) {
        throw Error('Vectors must be of the same length');
    }
    return vec.map((_, i) => vec[i] + translationVec[i]);
}

function scaleBy(scalar) {
    function newFunc(vec) {
        return scale(vec, scalar);
    }
    return newFunc;
}

function translateBy(translation) {
    function newFunc(vec) {
        return translate(vec, translation);
    }
    return newFunc;
}



// Tests
assertEquals(sum([1, 2, 3]), 6);
assertEquals(sum([-1, 0, 1, 8]), 8);
assertEquals(sum([-1, -1, -1]), -3);
assertEquals(sum([0, 0, 0]), 0);
assertEquals(sum([1, 2, 3]), 6);
assertEquals(dot([3, 4], [3, 4]), 25);
assertEquals(arrayEquals([1, 2, 3], [1, 2, 3]), true);

assertEquals(
    arrayEquals(
        addLists([1, 2, 3], [1, 2, 3]), [2, 4, 6]
    ),
    true);

assertEquals(
    arrayEquals(
        subLists([1, 2, 3], [1, 2, 3]), [0, 0, 0]
    ),
    true);

assertEquals(
    arrayEquals(
        subLists([10, 2, 4], [1, 2, 3]), [9, 0, 1]
    ),
    true);
