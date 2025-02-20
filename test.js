import HashMap from './src/HashMap.js';

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')

console.log(test.get('moon')); // silver
console.log(test.has('hat')); // true
console.log(test.keys()); // [ ... ]
console.log(test.entries()); // [ ... ]
console.log(test.values()); // [ ... ]
console.log(test.length()); // 13

test.clear();

console.log(test.entries()); // []
console.log(test.length()); // 0