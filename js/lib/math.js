// simple equality assertion test
const assertEquals = (val1, val2) => { if (val1 !== val2) throw Error(`Assertion Error: ${a} !== ${b}`) };

// pair values in two lists => list of tuples
const zip = (vec1, vec2) => vec1.map(
    (_, i) => [vec1[i], vec2[i]]);

// reducer for sum,sums()
const summer = (a, b) => a + b;

// add all items in a list
const sum = (vec) => vec.reduce(summer, 0)

// pairwise add values in two lists => list of sums
const sums = (vec1, vec2) => zip(vec1, vec2).map(tup => tup.reduce(summer, 0));

// reducer for multiplications
const multiplier = (a, b) => a * b;
const multiplications = (vec1, vec2) =>
    zip(vec1, vec2).map(tup => tup.reduce(multiplier, 1));

// dot product
const dot = (vec1, vec2) => multiplications(vec1, vec2).reduce(summer, 0);

assertEquals(sum([1, 2, 3]), 6);
assertEquals(sum([-1, 0, 1, 8]), 8);
assertEquals(sum([-1, -1, -1]), -3);
assertEquals(sum([0, 0, 0]), 0);

assertEquals(sum([1, 2, 3]), 6);
assertEquals(dot([3, 4], [3, 4]), 25);